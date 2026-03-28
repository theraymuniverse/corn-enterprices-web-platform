<<<<<<< HEAD
import { Resend } from 'resend'

const resend = new Resend('re_KHFJ9vdH_HT12EFF38X4BQwUQbVn2g7p3')

const FROM_DEFAULT = "COR'N Enterprises <hello@cornenterprise.com>"

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
=======
import { Resend } from 'resend';

const resend = new Resend(process.env.VITE_RESEND_API_KEY);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
>>>>>>> parent of 61f9c1a (running)
  }

  const {
    fullName, phone, email, address, cityState,
<<<<<<< HEAD
    employmentStatus, employerName, workAddress, monthlyIncome, yearsAtJob,
    loanType, loanAmount, loanPurpose, repaymentDuration,
    guarantorName, guarantorPhone, guarantorRelationship, guarantorOccupation,
    work_id_url, salary_slip_url,
  } = req.body

  if (!fullName || !email || !loanType) {
    return res.status(400).json({ message: 'Required fields are missing' })
  }

  try {
    await resend.emails.send({
      from: FROM_DEFAULT,
      to: 'cornenterprises2709@gmail.com',
      replyTo: email,
      subject: `New Loan Application — ${fullName} (${loanType})`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e0e0e0;border-radius:8px;overflow:hidden;">
          <div style="background:#1a4731;padding:24px 32px;">
            <h1 style="color:#fff;margin:0;font-size:20px;">New Loan Application</h1>
            <p style="color:#3dba6f;margin:6px 0 0;font-size:14px;">COR'N Enterprises Limited</p>
          </div>
          <div style="padding:32px;background:#fff;">
            <h3 style="color:#1a4731;border-bottom:1px solid #e0f0e8;padding-bottom:8px;">Personal Information</h3>
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Address:</strong> ${address}, ${cityState}</p>

            <h3 style="color:#1a4731;border-bottom:1px solid #e0f0e8;padding-bottom:8px;margin-top:24px;">Employment</h3>
            <p><strong>Status:</strong> ${employmentStatus}</p>
            <p><strong>Employer:</strong> ${employerName}</p>
            <p><strong>Work Address:</strong> ${workAddress}</p>
            <p><strong>Monthly Income:</strong> ₦${monthlyIncome}</p>
            <p><strong>Years at Job:</strong> ${yearsAtJob}</p>

            <h3 style="color:#1a4731;border-bottom:1px solid #e0f0e8;padding-bottom:8px;margin-top:24px;">Loan Details</h3>
            <p><strong>Type:</strong> ${loanType}</p>
            <p><strong>Amount:</strong> ${loanAmount}</p>
            <p><strong>Purpose:</strong> ${loanPurpose}</p>
            <p><strong>Repayment Duration:</strong> ${repaymentDuration}</p>

            <h3 style="color:#1a4731;border-bottom:1px solid #e0f0e8;padding-bottom:8px;margin-top:24px;">Guarantor</h3>
            <p><strong>Name:</strong> ${guarantorName}</p>
            <p><strong>Phone:</strong> ${guarantorPhone}</p>
            <p><strong>Relationship:</strong> ${guarantorRelationship}</p>
            <p><strong>Occupation:</strong> ${guarantorOccupation}</p>

            <h3 style="color:#1a4731;border-bottom:1px solid #e0f0e8;padding-bottom:8px;margin-top:24px;">Documents</h3>
            <p><strong>Work ID:</strong> ${work_id_url ? `<a href="${work_id_url}" style="color:#3dba6f;">View Document</a>` : 'Not uploaded'}</p>
            <p><strong>Salary Slip:</strong> ${salary_slip_url ? `<a href="${salary_slip_url}" style="color:#3dba6f;">View Document</a>` : 'Not uploaded'}</p>
          </div>
          <div style="background:#f9f9f9;padding:14px 32px;border-top:1px solid #e0e0e0;text-align:center;">
            <p style="margin:0;color:#bbb;font-size:11px;">TBS Plaza, Jalingo, Taraba State, Nigeria</p>
          </div>
        </div>
      `,
    })

    await resend.emails.send({
      from: FROM_DEFAULT,
      to: email,
      subject: "Loan Application Received — COR'N Enterprises Limited",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;">
          <div style="background:#1a4731;padding:24px 32px;">
            <h1 style="color:#fff;margin:0;font-size:20px;">Application Received</h1>
            <p style="color:#3dba6f;margin:6px 0 0;font-size:14px;">COR'N Enterprises Limited</p>
          </div>
          <div style="padding:28px 32px;background:#fff;border:1px solid #e0e0e0;">
            <p>Dear <strong>${fullName}</strong>,</p>
            <p style="color:#555;">Your loan application has been received. Our team will review it shortly.</p>
            <div style="background:#f0f9f4;padding:14px;border-radius:6px;margin:16px 0;">
              <p style="margin:0;color:#1a4731;font-size:13px;"><strong>Type:</strong> ${loanType}</p>
              <p style="margin:6px 0 0;color:#1a4731;font-size:13px;"><strong>Amount:</strong> ${loanAmount}</p>
              <p style="margin:6px 0 0;color:#1a4731;font-size:13px;"><strong>Repayment:</strong> ${repaymentDuration}</p>
            </div>
            <p style="color:#555;">📞 <strong>08023447314</strong><br/>
            💬 <a href="https://wa.me/2348023447314" style="color:#3dba6f;">WhatsApp Us</a></p>
            <p style="color:#1a4731;font-weight:bold;">COR'N Enterprises Limited</p>
            <p style="color:#999;font-size:12px;">Integrity · Boldness · Professionalism</p>
          </div>
        </div>
      `,
    })

    res.status(200).json({ message: 'Loan application submitted successfully!' })
  } catch (error) {
    console.error('Loan Error:', error.message)
    res.status(500).json({ message: 'Failed to submit application. Please try again.', errorDetail: error.message })
  }
=======
        employmentStatus, employerName, workAddress, monthlyIncome, yearsAtJob,
        loanType, loanAmount, loanPurpose, repaymentDuration,
        guarantorName, guarantorPhone, guarantorRelationship, guarantorOccupation,
    } = req.body;

    try {
        await resend.emails.send({
            from: 'COR\'N Loan Applications <hello@cornenterprise.com>',
            to: 'sales@cornenterprise.com',
            replyTo: email,
            subject: `New Loan Application — ${fullName} (${loanType})`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
                    
                    <!-- Header -->
                    <div style="background-color: #1a4731; padding: 24px 32px;">
                        <h1 style="color: #ffffff; margin: 0; font-size: 20px;">New Loan Application Received</h1>
                        <p style="color: #3dba6f; margin: 6px 0 0; font-size: 14px;">COR'N Enterprises Limited — Loan Management</p>
                    </div>

                    <!-- Body -->
                    <div style="padding: 32px; background-color: #ffffff;">

                        <!-- Section: Personal Information -->
                        <h2 style="color: #1a4731; font-size: 15px; border-bottom: 2px solid #f0f9f4; padding-bottom: 8px; margin-top: 0;">1. Personal Information</h2>
                        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                            <tr><td style="padding: 6px 0; color: #555; font-size: 13px; width: 40%;">Full Name</td><td style="padding: 6px 0; font-weight: bold; color: #111; font-size: 13px;">${fullName}</td></tr>
                            <tr><td style="padding: 6px 0; color: #555; font-size: 13px;">Phone Number</td><td style="padding: 6px 0; font-weight: bold; color: #111; font-size: 13px;">${phone}</td></tr>
                            <tr><td style="padding: 6px 0; color: #555; font-size: 13px;">Email Address</td><td style="padding: 6px 0; font-weight: bold; color: #111; font-size: 13px;">${email}</td></tr>
                            <tr><td style="padding: 6px 0; color: #555; font-size: 13px;">Residential Address</td><td style="padding: 6px 0; font-weight: bold; color: #111; font-size: 13px;">${address}</td></tr>
                            <tr><td style="padding: 6px 0; color: #555; font-size: 13px;">City / State</td><td style="padding: 6px 0; font-weight: bold; color: #111; font-size: 13px;">${cityState}</td></tr>
                        </table>

                        <!-- Section: Employment Information -->
                        <h2 style="color: #1a4731; font-size: 15px; border-bottom: 2px solid #f0f9f4; padding-bottom: 8px;">2. Employment Information</h2>
                        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                            <tr><td style="padding: 6px 0; color: #555; font-size: 13px; width: 40%;">Employment Status</td><td style="padding: 6px 0; font-weight: bold; color: #111; font-size: 13px;">${employmentStatus}</td></tr>
                            <tr><td style="padding: 6px 0; color: #555; font-size: 13px;">Employer / Business Name</td><td style="padding: 6px 0; font-weight: bold; color: #111; font-size: 13px;">${employerName}</td></tr>
                            <tr><td style="padding: 6px 0; color: #555; font-size: 13px;">Work Address</td><td style="padding: 6px 0; font-weight: bold; color: #111; font-size: 13px;">${workAddress}</td></tr>
                            <tr><td style="padding: 6px 0; color: #555; font-size: 13px;">Monthly Income</td><td style="padding: 6px 0; font-weight: bold; color: #111; font-size: 13px;">₦${monthlyIncome}</td></tr>
                            <tr><td style="padding: 6px 0; color: #555; font-size: 13px;">Years at Current Job</td><td style="padding: 6px 0; font-weight: bold; color: #111; font-size: 13px;">${yearsAtJob}</td></tr>
                        </table>

                        <!-- Section: Loan Details -->
                        <h2 style="color: #1a4731; font-size: 15px; border-bottom: 2px solid #f0f9f4; padding-bottom: 8px;">3. Loan Details</h2>
                        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                            <tr><td style="padding: 6px 0; color: #555; font-size: 13px; width: 40%;">Loan Type</td><td style="padding: 6px 0; font-weight: bold; color: #111; font-size: 13px;">${loanType}</td></tr>
                            <tr><td style="padding: 6px 0; color: #555; font-size: 13px;">Loan Amount</td><td style="padding: 6px 0; font-weight: bold; color: #3dba6f; font-size: 15px;">${loanAmount}</td></tr>
                            <tr><td style="padding: 6px 0; color: #555; font-size: 13px;">Purpose of Loan</td><td style="padding: 6px 0; font-weight: bold; color: #111; font-size: 13px;">${loanPurpose}</td></tr>
                            <tr><td style="padding: 6px 0; color: #555; font-size: 13px;">Repayment Duration</td><td style="padding: 6px 0; font-weight: bold; color: #111; font-size: 13px;">${repaymentDuration}</td></tr>
                        </table>

                        <!-- Section: Guarantor Information -->
                        <h2 style="color: #1a4731; font-size: 15px; border-bottom: 2px solid #f0f9f4; padding-bottom: 8px;">4. Guarantor Information</h2>
                        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                            <tr><td style="padding: 6px 0; color: #555; font-size: 13px; width: 40%;">Guarantor Full Name</td><td style="padding: 6px 0; font-weight: bold; color: #111; font-size: 13px;">${guarantorName}</td></tr>
                            <tr><td style="padding: 6px 0; color: #555; font-size: 13px;">Guarantor Phone</td><td style="padding: 6px 0; font-weight: bold; color: #111; font-size: 13px;">${guarantorPhone}</td></tr>
                            <tr><td style="padding: 6px 0; color: #555; font-size: 13px;">Relationship to Applicant</td><td style="padding: 6px 0; font-weight: bold; color: #111; font-size: 13px;">${guarantorRelationship}</td></tr>
                            <tr><td style="padding: 6px 0; color: #555; font-size: 13px;">Guarantor Occupation</td><td style="padding: 6px 0; font-weight: bold; color: #111; font-size: 13px;">${guarantorOccupation}</td></tr>
                        </table>

                        <!-- Action note -->
                        <div style="background-color: #f0f9f4; border-left: 4px solid #3dba6f; padding: 14px 18px; border-radius: 4px; margin-top: 8px;">
                            <p style="margin: 0; color: #1a4731; font-size: 13px; font-weight: bold;">Action Required</p>
                            <p style="margin: 6px 0 0; color: #555; font-size: 13px;">Please review this application and contact the applicant within the standard processing window. Document uploads (Work ID and Salary Slip) should be requested if not already received.</p>
                        </div>
                    </div>

                    <!-- Footer -->
                    <div style="background-color: #f9f9f9; padding: 16px 32px; border-top: 1px solid #e0e0e0; text-align: center;">
                        <p style="margin: 0; color: #999; font-size: 12px;">COR'N Enterprises Limited — Loan Application System</p>
                        <p style="margin: 4px 0 0; color: #bbb; font-size: 11px;">This email was generated automatically from the website loan application form.</p>
                    </div>
                </div>
            `,
        });

        // Send confirmation email to applicant
        await resend.emails.send({
            from: 'COR\'N Enterprises <hello@cornenterprise.com>',
            to: email,
            subject: `Loan Application Received — COR'N Enterprises Limited`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
                    <div style="background-color: #1a4731; padding: 24px 32px;">
                        <h1 style="color: #ffffff; margin: 0; font-size: 20px;">Application Received</h1>
                        <p style="color: #3dba6f; margin: 6px 0 0; font-size: 14px;">COR'N Enterprises Limited</p>
                    </div>
                    <div style="padding: 32px; background-color: #ffffff;">
                        <p style="color: #333; font-size: 15px;">Dear <strong>${fullName}</strong>,</p>
                        <p style="color: #555; font-size: 14px; line-height: 1.7;">Thank you for submitting your loan application to COR'N Enterprises Limited. We have received your request and our team will review it promptly.</p>
                        <div style="background-color: #f0f9f4; border-radius: 8px; padding: 16px 20px; margin: 20px 0;">
                            <p style="margin: 0; color: #1a4731; font-size: 13px;"><strong>Loan Type:</strong> ${loanType}</p>
                            <p style="margin: 8px 0 0; color: #1a4731; font-size: 13px;"><strong>Amount Requested:</strong> ${loanAmount}</p>
                            <p style="margin: 8px 0 0; color: #1a4731; font-size: 13px;"><strong>Repayment Duration:</strong> ${repaymentDuration}</p>
                        </div>
                        <p style="color: #555; font-size: 14px; line-height: 1.7;">Qualified applicants may receive loan approval within minutes after document verification. If additional information is required, a member of our team will contact you shortly.</p>
                        <p style="color: #555; font-size: 14px; line-height: 1.7;">For urgent inquiries, you may reach us via:</p>
                        <p style="color: #555; font-size: 14px;">📞 <strong>08023447314</strong><br/>📧 <strong>info@cornenterprise.com</strong></p>
                        <p style="color: #1a4731; font-size: 14px; font-weight: bold; margin-top: 24px;">COR'N Enterprises Limited</p>
                        <p style="color: #999; font-size: 12px; margin: 0;">Integrity · Boldness · Professionalism</p>
                    </div>
                    <div style="background-color: #f9f9f9; padding: 16px 32px; border-top: 1px solid #e0e0e0; text-align: center;">
                        <p style="margin: 0; color: #bbb; font-size: 11px;">TBS Plaza, Jalingo, Taraba State, Nigeria</p>
                    </div>
                </div>
            `,
        });

        res.status(200).json({ message: "Loan application submitted successfully!" });

    } catch (error) {
        console.error("Email Error:", error);
        res.status(500).json({ message: "Failed to send application email", error: error.message });
    }
>>>>>>> parent of 61f9c1a (running)
}