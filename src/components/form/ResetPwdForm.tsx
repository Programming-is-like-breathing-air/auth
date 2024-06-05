import React from 'react'

const ResetPwdForm = () => {
    return (
        <div className="container mx-auto px-4">
            <h1 className="text-xl font-bold">Reset Your Password</h1>
            <p>Please enter your email address to receive a link to reset your password.</p>
            <input
                type="email"
                placeholder="Enter your email"
                className="border p-2"
            />
            <button className="bg-blue-500 text-white p-2 mt-2">Send Reset Link</button>
            {/* <Link href="/" className="underline">
          back to login
        </Link> */}
        </div>
    )
}

export default ResetPwdForm
