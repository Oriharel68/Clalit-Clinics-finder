import Clalit from "../assets/Clalit.png";

function LoginPage() {
  return (
    <div className="bg-white font-family-karla h-screen text-right">
      <div className="w-full flex flex-wrap">
      <div className="w-1/2 shadow-2xl">
          <img
            className="object-cover w-full h-screen hidden md:block"
            src="https://source.unsplash.com/IXUM4cJynP0"
          />
        </div>
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-24">
            <div className="w-36">
            <img src={Clalit} className="bg-contain text-white p-4"/>
            </div>
            
           
          </div>

          <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
            <p className="text-center text-3xl">ברוך הבא</p>
            <form className="flex flex-col pt-3 md:pt-8">
              <div className="flex flex-col pt-4">
                <label className="text-lg">שם משתמש</label>
                <input
                  placeholder="שם משתמש"
                  className="text-right shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="flex flex-col pt-4">
                <label className="text-lg">טוקן</label>
                <input
                  placeholder="טוקן"
                  className="text-right shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <input
                type="submit"
                value="כניסה"
                className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8"
              />
            </form>
          </div>
        </div>

      
      </div>
    </div>
  );
}

export default LoginPage;
