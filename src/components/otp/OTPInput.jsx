export const OTPInput = () => {   

const otpConfig = {
  length: 6,
  type: "number",
  title: "Verify Your Account",
  subtitle: "Enter the 6-digit code sent to your email",
};

const arr = new Array(otpConfig.length);
console.log(arr)
    return(
        <>
        <main>
            <div>
                <p className="text-sm text-center mb-4">{otpConfig.subtitle}</p>
                <div className="flex gap-3 items-center justify-between my-4 px-4">
                {
                    Array.from({length: otpConfig.length}, (_, i) => 
                        <input type="number" minLength={1} maxLength={1} key={i} className="w-20 h-20 border-blue-300 border rounded-lg"/>
                    )
       
          
                }
                </div>
            </div>
        </main> 
        </>
    )
}