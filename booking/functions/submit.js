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

    const emailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #dc2626; padding: 20px 24px; border-radius: 8px 8px 0 0;">
          <h2 style="color: white; margin: 0; font-size: 20px;">New Appointment Request</h2>
          <p style="color: #fca5a5; margin: 4px 0 0; font-size: 14px;">Barrie AutoCare Online Booking</p>
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

          <div style="margin-top: 24px; padding: 16px; background: #fef2f2; border-radius: 8px; border: 1px solid #fecaca;">
            <p style="margin: 0; font-size: 13px; color: #991b1b;">
              Reply directly to this email to reach the customer — their address is set as the reply-to.
            </p>
          </div>
        </div>
      </div>
    `;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Barrie AutoCare Booking <booking@barriewebautomation.com>',
        to:   [env.SHOP_EMAIL],
        reply_to: fields.email,
        subject: `Booking Request — ${fields.name} | ${fields.year} ${fields.make} ${fields.model} | ${fields.date}`,
        html: emailHtml,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('Resend error:', err);
      return new Response(JSON.stringify({ success: false, error: err }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
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
