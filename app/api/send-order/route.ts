import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { fill, getMessages } from '@/lib/i18n'
import { parseLocale } from '@/lib/locale'
import { siteConfig } from '@/lib/site'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export async function POST(request: NextRequest) {
  let t = getMessages('en')
  try {
    const body = await request.json()
    const { customerInfo, orderItems, total } = body
    t = getMessages(parseLocale(body.locale))

    if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      console.error('Missing SMTP credentials in environment variables')
      return NextResponse.json(
        { success: false, message: t.api.notConfigured },
        { status: 500 }
      )
    }

    if (!customerInfo || !orderItems || orderItems.length === 0) {
      return NextResponse.json(
        { success: false, message: t.api.invalid },
        { status: 400 }
      )
    }

    const customerEmail =
      typeof customerInfo.email === 'string' ? customerInfo.email.trim() : ''
    if (!customerEmail || customerEmail.length > 254 || !EMAIL_REGEX.test(customerEmail)) {
      return NextResponse.json(
        { success: false, message: t.api.badEmail },
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
        { success: false, message: t.api.configError },
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
          <li><strong>Name:</strong> ${escapeHtml(customerInfo.name)}</li>
          <li><strong>Email:</strong> ${escapeHtml(customerEmail)}</li>
          <li><strong>Phone:</strong> ${escapeHtml(customerInfo.phone)}</li>
          ${customerInfo.notes ? `<li><strong>Notes:</strong> ${escapeHtml(customerInfo.notes)}</li>` : ''}
        </ul>
        
        <h3>Order Items:</h3>
        <pre style="background: #f5f5f5; padding: 15px; border-radius: 5px;">${escapeHtml(orderItemsText)}</pre>
        
        <h3>Total: ${total.toLocaleString()} HUF</h3>
        
        <p><strong>Pickup:</strong> ${siteConfig.pickup.summary}</p>
        <p><strong>Customer language:</strong> ${body.locale === 'hu' ? 'Hungarian' : 'English'}</p>
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
        Customer language: ${body.locale === 'hu' ? 'Hungarian' : 'English'}
        Order Date: ${new Date().toLocaleString()}
      `,
    }

    const customerName = typeof customerInfo.name === 'string' ? customerInfo.name : ''
    const customerMailOptions = {
      from: process.env.SMTP_USER,
      to: customerEmail,
      subject: t.email.customerSubject,
      html: `
        <h2>${t.email.sent}</h2>
        <p>${fill(t.email.greeting, { name: escapeHtml(customerName) })}</p>
        <p>${t.email.thanks}</p>
        <p><strong>${t.email.pickup}:</strong> ${t.pickup.summary}</p>
        <p><strong>${t.payment.emailLine}</strong></p>
        <h3>${t.email.yourOrder}:</h3>
        <pre style="background: #f5f5f5; padding: 15px; border-radius: 5px;">${escapeHtml(orderItemsText)}</pre>
        <h3>${t.email.total}: ${total.toLocaleString()} HUF</h3>
        <p><strong>${t.email.orderDate}:</strong> ${new Date().toLocaleString(body.locale === 'hu' ? 'hu-HU' : 'en-GB')}</p>
      `,
      text: `
        ${t.email.sent}
        ${fill(t.email.greeting, { name: customerName })}
        ${t.email.thanks}
        ${t.email.pickup}: ${t.pickup.summary}
        ${t.payment.emailLine}

        ${t.email.yourOrder}:
        ${orderItemsText}

        ${t.email.total}: ${total.toLocaleString()} HUF
        ${t.email.orderDate}: ${new Date().toLocaleString(body.locale === 'hu' ? 'hu-HU' : 'en-GB')}
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
      { success: true, message: t.api.sent, confirmationEmailSent },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Error sending email:', error)
    
    let errorMessage = t.api.failed
    if (error.code === 'EAUTH') {
      errorMessage = t.api.auth
    } else if (error.code === 'ECONNECTION') {
      errorMessage = t.api.connection
    }
    
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    )
  }
}
