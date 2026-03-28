import { Resend } from 'resend'

const resend = new Resend('re_KHFJ9vdH_HT12EFF38X4BQwUQbVn2g7p3')

const FROM_DEFAULT = "COR'N Enterprises <Credit@cornenterprise.com>"

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const {
    fullName, phone, email, address, cityState,
    employmentStatus, employerName, workAddress, monthlyIncome, yearsAtJob,
    loanType, loanAmount, loanPurpose, repaymentDuration,
    guarantorName, guarantorPhone, guarantorRelationship, guarantorOccupation, guarantorID,
    work_id_url, salary_slip_url,
  } = req.body

  if (!fullName || !email || !loanType) {
    return res.status(400).json({ message: 'Required fields are missing' })
  }

  try {
    await resend.emails.send({
      from: FROM_DEFAULT,
      to: 'Credit@cornenterprise.com',
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
            <p><strong>UniqueID:</strong> ${guarantorID}</p>

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
}