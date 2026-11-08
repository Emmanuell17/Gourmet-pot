import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { siteConfig } from '@/lib/site'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { customerInfo, orderItems, total } = body

    if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      console.error('Missing SMTP credentials in environment variables')
      return NextResponse.json(
        { success: false, message: 'Email service is not configured. Please contact the restaurant directly.' },
        { status: 500 }
      )
    }

    if (!customerInfo || !orderItems || orderItems.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Invalid order data provided.' },
        { status: 400 }
      )
    }

    const customerEmail =
      typeof customerInfo.email === 'string' ? customerInfo.email.trim() : ''
    if (!customerEmail || customerEmail.length > 254 || !EMAIL_REGEX.test(customerEmail)) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid email address.' },
        { status: 400 }
      )
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    })

    try {
      await transporter.verify()
    } catch (verifyError) {
      console.error('SMTP verification failed:', verifyError)
      return NextResponse.json(
        { success: false, message: 'Email service configuration error. Please contact the restaurant directly.' },
        { status: 500 }
      )
    }

    const orderItemsText = orderItems
      .map((item: any) => {
        const price =
          item.priceNum === 0 || String(item.price).toLowerCase().includes('varies')
            ? 'Price varies'
            : `${(item.priceNum * item.quantity).toLocaleString()} HUF`
        return `${item.name} × ${item.quantity} - ${price}`
      })
      .join('\n')

    const chefMailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.ORDER_EMAIL || process.env.SMTP_USER,
      subject: `New Order from ${customerInfo.name} - Gourmet Pot`,
      html: `
        <h2>New Order Received</h2>
        <h3>Customer Information:</h3>
        <ul>
          <li><strong>Name:</strong> ${customerInfo.name}</li>
          <li><strong>Email:</strong> ${customerEmail}</li>
          <li><strong>Phone:</strong> ${customerInfo.phone}</li>
          ${customerInfo.notes ? `<li><strong>Notes:</strong> ${customerInfo.notes}</li>` : ''}
        </ul>
        
        <h3>Order Items:</h3>
        <pre style="background: #f5f5f5; padding: 15px; border-radius: 5px;">${orderItemsText}</pre>
        
        <h3>Total: ${total.toLocaleString()} HUF</h3>
        
        <p><strong>Pickup:</strong> ${siteConfig.pickup.summary}</p>
        <p><strong>Order Date:</strong> ${new Date().toLocaleString()}</p>
      `,
      text: `
        New Order Received
        
        Customer Information:
        Name: ${customerInfo.name}
        Email: ${customerEmail}
        Phone: ${customerInfo.phone}
        ${customerInfo.notes ? `Notes: ${customerInfo.notes}` : ''}
        
        Order Items:
        ${orderItemsText}
        
        Total: ${total.toLocaleString()} HUF
        
        Pickup: ${siteConfig.pickup.summary}
        Order Date: ${new Date().toLocaleString()}
      `,
    }

    const paymentLine =
      'Payment: contact us for payment via Revolut, Bank transfer or Cash.'

    const customerMailOptions = {
      from: process.env.SMTP_USER,
      to: customerEmail,
      subject: `Order confirmation - Gourmet Pot`,
      html: `
        <h2>Order sent successfully</h2>
        <p>Hi ${customerInfo.name},</p>
        <p>Thanks for your order. We received it and will review it shortly.</p>
        <p><strong>Pickup:</strong> ${siteConfig.pickup.summary}</p>
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
        Pickup: ${siteConfig.pickup.summary}
        ${paymentLine}

        Your order:
        ${orderItemsText}

        Total: ${total.toLocaleString()} HUF
        Order Date: ${new Date().toLocaleString()}
      `,
    }

    await transporter.sendMail(chefMailOptions)

    let confirmationEmailSent = true
    try {
      await transporter.sendMail(customerMailOptions)
    } catch (customerEmailError) {
      confirmationEmailSent = false
      console.error('Error sending customer confirmation email:', customerEmailError)
    }

    return NextResponse.json(
      { success: true, message: 'Order sent successfully!', confirmationEmailSent },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Error sending email:', error)
    
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
