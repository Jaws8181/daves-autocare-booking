export async function onRequestPost({ request, env }) {
  try {
    const formData = await request.formData();

    const fields = {
      service:  formData.get('Service')        || '—',
      date:     formData.get('Preferred_Date') || '—',
      time:     formData.get('Preferred_Time') || '—',
      year:     formData.get('Vehicle_Year')   || '—',
      make:     formData.get('Vehicle_Make')   || '—',
      model:    formData.get('Vehicle_Model')  || '—',
      km:       formData.get('Odometer_KM')    || '—',
      comments: formData.get('Comments')       || '—',
      name:     formData.get('Customer_Name')  || '—',
      phone:    formData.get('Phone_Number')   || '—',
      email:    formData.get('email')          || '—',
    };

    // Build pre-filled mailto link for Dave's confirm button
    const confirmSubject = encodeURIComponent(`Your Appointment is Confirmed — Barrie AutoCare`);
    const confirmBody = encodeURIComponent(
      `Hi ${fields.name},\n\nYour appointment is confirmed!\n\nService: ${fields.service}\nDate: ${fields.date}\nTime: ${fields.time}\nVehicle: ${fields.year} ${fields.make} ${fields.model}\n\nIf you have any questions, feel free to reply to this email or give us a call.\n\nSee you then!\nBarrie AutoCare`
    );
    const mailtoLink = `mailto:${fields.email}?subject=${confirmSubject}&body=${confirmBody}`;

    const emailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #dc2626; padding: 20px 24px; border-radius: 8px 8px 0 0;">
          <h2 style="color: white; margin: 0; font-size: 20px;">New Appointment Request</h2>
          <p style="color: #fca5a5; margin: 4px 0 0; font-size: 14px;">10 Sarjeant Dr, Barrie, ON · L4N 4V8</p>
        </div>

        <div style="background: #f9fafb; padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">

          <table style="width: 100%; border-collapse: collapse;">
            <tr><td colspan="2" style="padding: 8px 0 4px; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #9ca3af; letter-spacing: 0.05em;">Appointment</td></tr>
            <tr>
              <td style="padding: 6px 0; font-size: 14px; color: #6b7280; width: 140px;">Service</td>
              <td style="padding: 6px 0; font-size: 14px; color: #111827; font-weight: 600;">${fields.service}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-size: 14px; color: #6b7280;">Preferred Date</td>
              <td style="padding: 6px 0; font-size: 14px; color: #111827; font-weight: 600;">${fields.date}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-size: 14px; color: #6b7280;">Preferred Time</td>
              <td style="padding: 6px 0; font-size: 14px; color: #111827; font-weight: 600;">${fields.time}</td>
            </tr>

            <tr><td colspan="2" style="padding: 16px 0 4px; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #9ca3af; letter-spacing: 0.05em; border-top: 1px solid #e5e7eb;">Vehicle</td></tr>
            <tr>
              <td style="padding: 6px 0; font-size: 14px; color: #6b7280;">Year / Make / Model</td>
              <td style="padding: 6px 0; font-size: 14px; color: #111827; font-weight: 600;">${fields.year} ${fields.make} ${fields.model}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-size: 14px; color: #6b7280;">Odometer</td>
              <td style="padding: 6px 0; font-size: 14px; color: #111827; font-weight: 600;">${fields.km !== '—' ? Number(fields.km).toLocaleString() + ' km' : '—'}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-size: 14px; color: #6b7280; vertical-align: top;">Notes</td>
              <td style="padding: 6px 0; font-size: 14px; color: #111827;">${fields.comments}</td>
            </tr>

            <tr><td colspan="2" style="padding: 16px 0 4px; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #9ca3af; letter-spacing: 0.05em; border-top: 1px solid #e5e7eb;">Customer</td></tr>
            <tr>
              <td style="padding: 6px 0; font-size: 14px; color: #6b7280;">Name</td>
              <td style="padding: 6px 0; font-size: 14px; color: #111827; font-weight: 600;">${fields.name}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-size: 14px; color: #6b7280;">Phone</td>
              <td style="padding: 6px 0; font-size: 14px; color: #111827; font-weight: 600;"><a href="tel:${fields.phone}" style="color: #dc2626;">${fields.phone}</a></td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-size: 14px; color: #6b7280;">Email</td>
              <td style="padding: 6px 0; font-size: 14px; color: #111827; font-weight: 600;"><a href="mailto:${fields.email}" style="color: #dc2626;">${fields.email}</a></td>
            </tr>
          </table>

          <div style="margin-top: 24px; text-align: center;">
            <a href="${mailtoLink}" style="display: inline-block; background: #dc2626; color: white; text-decoration: none; font-size: 15px; font-weight: 700; padding: 14px 32px; border-radius: 8px;">
              ✓ Confirm Appointment
            </a>
            <p style="margin: 10px 0 0; font-size: 12px; color: #6b7280;">Opens your email pre-filled — edit date/time if needed, then hit Send.</p>
          </div>

          <div style="margin-top: 16px; padding: 16px; background: #fef2f2; border-radius: 8px; border: 1px solid #fecaca;">
            <p style="margin: 0; font-size: 13px; color: #991b1b;">
              Or reply directly to this email to reach the customer — their address is set as the reply-to.
            </p>
          </div>
        </div>
      </div>
    `;

    const subject = `Booking Request — ${fields.name} | ${fields.year} ${fields.make} ${fields.model} | ${fields.date}`;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Barrie AutoCare Booking <booking@barriewebautomation.com>',
        to: [env.NOTIFY_EMAIL],
        reply_to: fields.email,
        subject,
        html: emailHtml,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Resend error: ${err}`);
    }

    // Customer confirmation email
    if (fields.email && fields.email !== '—') {
      const customerConfirmHtml = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #dc2626; padding: 20px 24px; border-radius: 8px 8px 0 0;">
            <h2 style="color: white; margin: 0; font-size: 20px;">Booking Request Received</h2>
            <p style="color: #fca5a5; margin: 4px 0 0; font-size: 14px;">10 Sarjeant Dr, Barrie, ON · L4N 4V8</p>
          </div>
          <div style="background: #f9fafb; padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
            <p style="font-size: 15px; color: #111827; margin-top: 0;">Hi ${fields.name}, thanks for reaching out! We've received your booking request and will be in touch shortly to confirm your appointment.</p>

            <table style="width: 100%; border-collapse: collapse;">
              <tr><td colspan="2" style="padding: 8px 0 4px; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #9ca3af; letter-spacing: 0.05em;">Your Request</td></tr>
              <tr>
                <td style="padding: 6px 0; font-size: 14px; color: #6b7280; width: 140px;">Service</td>
                <td style="padding: 6px 0; font-size: 14px; color: #111827; font-weight: 600;">${fields.service}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-size: 14px; color: #6b7280;">Preferred Date</td>
                <td style="padding: 6px 0; font-size: 14px; color: #111827; font-weight: 600;">${fields.date}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-size: 14px; color: #6b7280;">Preferred Time</td>
                <td style="padding: 6px 0; font-size: 14px; color: #111827; font-weight: 600;">${fields.time}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-size: 14px; color: #6b7280;">Vehicle</td>
                <td style="padding: 6px 0; font-size: 14px; color: #111827; font-weight: 600;">${fields.year} ${fields.make} ${fields.model}</td>
              </tr>
            </table>

            <div style="margin-top: 24px; padding: 16px; background: #fef2f2; border-radius: 8px; border: 1px solid #fecaca;">
              <p style="margin: 0; font-size: 13px; color: #991b1b;">Your appointment is not confirmed until you hear back from us. We'll reply to confirm or suggest an alternate time if needed.</p>
            </div>

            <p style="margin-top: 20px; font-size: 13px; color: #6b7280;">Questions? Reply to this email or call us directly.</p>
          </div>
        </div>
      `;

      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Barrie AutoCare <booking@barriewebautomation.com>',
          to: [fields.email],
          subject: `Booking Request Received — ${fields.service} on ${fields.date}`,
          html: customerConfirmHtml,
        }),
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err) {
    console.error('Function error:', err);
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
