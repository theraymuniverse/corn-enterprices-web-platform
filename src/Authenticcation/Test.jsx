import {Resend} from "resend"

const resend = new Resend(" re_KHFJ9vdH_HT12EFF38X4BQwUQbVn2g7p3")

export async function POST(request) {
  const { email } = await request.json()
  console.log(email)
  try {
    const data = await resend.sendEmail({
      from: "onboarding@resend.dev",
      to:"danzid2003@gmail.com",
      subject: "Welcome to our Newsletter",
      react: {
        body: "Hello, welcome to our newsletter! We're excited to have you on board.",
      },
    })
  }catch{}
}