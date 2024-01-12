import { useState, useCallback, useEffect, useRef } from "react";

function Pass() {
   const [password, SetPassword] = useState("password");
   const [number, SetNumber] = useState(false);
   const [special, SetSpecial] = useState(false);
   const [length, SetLength] = useState(8);

   const passCopy = useRef(null);

   const passwordGenerator = useCallback(
      function () {
         let passGenerated = "";
         let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
         if (number) str += "0123456789";
         if (special) str += "!@#$%^&*";

         for (let i = 1; i <= length; i++) {
            let index = Math.floor(Math.random() * str.length);
            passGenerated += str[index];
         }

         SetPassword(passGenerated);
      },
      [number, special, length]
   );

   useEffect(() => {
      passwordGenerator();
   }, [number, special, length]);

   const passwordCopy = useCallback(() => {
      passCopy.current?.select();
      window.navigator.clipboard.writeText(password);
   }, [password]);
   return (
      <div className=" bg-gray-300 w-3/4 h-full p-4 rounded-xl text-black">
         <div className="flex flex-wrap justify-normal content-center w-full h-20">
            <input
               className="flex-3 w-3/4 h-10 rounded m-2 border-none pl-2 mr-0"
               type="text"
               placeholder="Password"
               value={password}
               ref={passCopy}
               readOnly
            />
            <button
               onClick={passwordCopy}
               className="m-2 flex-1 bg-indigo-900 p-2 h-10 ml-0 rounded-r-lg text-white"
            >
               Copy
            </button>
         </div>
         <div className="flex flex-wrap justify-around content-center w-full">
            <div>
               <input
                  type="range"
                  id="len"
                  min={8}
                  max={99}
                  onChange={(e) => SetLength(e.target.value)}
               />
               <label htmlFor="len">Length: {length}</label>
            </div>
            <div>
               <input
                  type="checkbox"
                  name="Numbers"
                  id="number"
                  className="mr-1"
                  onChange={() => SetNumber((preV) => !preV)}
               />
               <label htmlFor="number">Numbers</label>
            </div>
            <div>
               <input
                  type="checkbox"
                  name="Special"
                  id="special"
                  className="mr-1"
                  onChange={() => SetSpecial((preV) => !preV)}
               />
               <label htmlFor="special">Special</label>
            </div>
         </div>
      </div>
   );
}

export default Pass;
