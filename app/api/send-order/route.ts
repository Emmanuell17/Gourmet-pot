import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { customerInfo, orderItems, total } = body

    // Validate required environment variables
    if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      console.error('Missing SMTP credentials in environment variables')
      return NextResponse.json(
        { success: false, message: 'Email service is not configured. Please contact the restaurant directly.' },
        { status: 500 }
      )
    }

    // Validate request data
    if (!customerInfo || !orderItems || orderItems.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Invalid order data provided.' },
        { status: 400 }
      )
    }

    // Validate customer email (for confirmation email)
    const customerEmail =
      typeof customerInfo.email === 'string' ? customerInfo.email.trim() : ''
    const isValidCustomerEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)

    // Create email transporter
    // SMTP_USER: The email account used to authenticate and SEND emails (the "from" address)
    // SMTP_PASSWORD: The password/app password for the SMTP_USER account
    // For Gmail, you need to use an App Password (not your regular password)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER, // Email account that sends the order emails
        pass: process.env.SMTP_PASSWORD, // Password for the sending account
      },
    })

    // Verify transporter configuration
    try {
      await transporter.verify()
    } catch (verifyError) {
      console.error('SMTP verification failed:', verifyError)
      return NextResponse.json(
        { success: false, message: 'Email service configuration error. Please contact the restaurant directly.' },
        { status: 500 }
      )
    }

    // Format order items
    const orderItemsText = orderItems
      .map((item: any) => {
        const price = item.price.includes('varies')
          ? 'Price varies'
          : `${(item.priceNum * item.quantity).toLocaleString()} HUF`
        return `${item.name} × ${item.quantity} - ${price}`
      })
      .join('\n')

    // Email content
    // from: The email address that sends the order (SMTP_USER)
    // to: The email address that receives orders (ORDER_EMAIL)
    // These can be the same email or different (e.g., send from noreply@restaurant.com to orders@restaurant.com)
    const chefMailOptions = {
      from: process.env.SMTP_USER, // Sender email (the account that sends)
      to: process.env.ORDER_EMAIL || process.env.SMTP_USER, // Recipient email (where orders are delivered)
      subject: `New Order from ${customerInfo.name} - Gourmet Pot`,
      html: `
        <h2>New Order Received</h2>
        <h3>Customer Information:</h3>
        <ul>
          <li><strong>Name:</strong> ${customerInfo.name}</li>
          <li><strong>Email:</strong> ${customerEmail}</li>
          <li><strong>Phone:</strong> ${customerInfo.phone}</li>
          ${customerInfo.address ? `<li><strong>Address:</strong> ${customerInfo.address}</li>` : ''}
          ${customerInfo.notes ? `<li><strong>Notes:</strong> ${customerInfo.notes}</li>` : ''}
        </ul>
        
        <h3>Order Items:</h3>
        <pre style="background: #f5f5f5; padding: 15px; border-radius: 5px;">${orderItemsText}</pre>
        
        <h3>Total: ${total.toLocaleString()} HUF</h3>
        
        <p><strong>Order Date:</strong> ${new Date().toLocaleString()}</p>
      `,
      text: `
        New Order Received
        
        Customer Information:
        Name: ${customerInfo.name}
        Email: ${customerEmail}
        Phone: ${customerInfo.phone}
        ${customerInfo.address ? `Address: ${customerInfo.address}` : ''}
        ${customerInfo.notes ? `Notes: ${customerInfo.notes}` : ''}
        
        Order Items:
        ${orderItemsText}
        
        Total: ${total.toLocaleString()} HUF
        
        Order Date: ${new Date().toLocaleString()}
      `,
    }

    const paymentLine =
      'Payment: contact us for payment via Revolut, Bank transfer or Cash.'

    const customerMailOptions = isValidCustomerEmail
      ? {
          from: process.env.SMTP_USER,
          to: customerEmail,
          subject: `Order confirmation - Gourmet Pot`,
          html: `
            <h2>Order sent successfully</h2>
            <p>Hi ${customerInfo.name},</p>
            <p>Thanks for your order. We received it and will review it shortly.</p>
            <p><strong>${paymentLine}</strong></p>
            <h3>Your order:</h3>
            <pre style="background: #f5f5f5; padding: 15px; border-radius: 5px;">${orderItemsText}</pre>
            <h3>Total: ${total.toLocaleString()} HUF</h3>
            <p><strong>Order Date:</strong> ${new Date().toLocaleString()}</p>
          `,
          text: `
            Order sent successfully
            Hi ${customerInfo.name},
            Thanks for your order. We received it and will review it shortly.
            ${paymentLine}

            Your order:
            ${orderItemsText}

            Total: ${total.toLocaleString()} HUF
            Order Date: ${new Date().toLocaleString()}
          `,
        }
      : null

    // Send chef email (always)
    await transporter.sendMail(chefMailOptions)

    // Send customer confirmation email (best-effort)
    if (customerMailOptions) {
      try {
        await transporter.sendMail(customerMailOptions)
      } catch (customerEmailError) {
        console.error('Error sending customer confirmation email:', customerEmailError)
      }
    }

    return NextResponse.json(
      { success: true, message: 'Order sent successfully!' },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Error sending email:', error)
    
    // Provide more specific error messages
    let errorMessage = 'Failed to send order. Please try again or call us.'
    if (error.code === 'EAUTH') {
      errorMessage = 'Email authentication failed. Please contact the restaurant directly.'
    } else if (error.code === 'ECONNECTION') {
      errorMessage = 'Could not connect to email server. Please try again later.'
    }
    
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    )
  }
}
