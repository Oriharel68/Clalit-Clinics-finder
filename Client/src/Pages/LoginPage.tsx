import axios from "axios";
import Clalit from "../assets/Clalit.png";
import { useForm, SubmitHandler } from "react-hook-form";
import Apiurl from "../ApiUrl/URL";

type input = {
  userName: string;
  token: string;
};
function LoginPage() {
  const { register, handleSubmit,formState:{errors} } = useForm<input>();
  const onSubmit: SubmitHandler<input> = async (data) => {
    try {
      const response = await axios.post(`${Apiurl}/login`, data);
      if (response.status !== 200) return alert("ההתחברות נכשלה");
      alert("התחברות הצליחה");
    } catch (error:any) {
      alert(error.message);
    }
  };

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
              <img src={Clalit} className="bg-contain text-white p-4" />
            </div>
          </div>

          <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
            <p className="text-center text-3xl">ברוך הבא</p>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col pt-3 md:pt-8"
            >
              <div className="flex flex-col pt-4">
                <label className="text-lg">שם משתמש</label>
                <input
                  {...register("userName", { required: 'חובה להזין שם משתמש' })}
                  placeholder="שם משתמש"
                  className="text-right shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
                 {errors.userName && <span className="text-red-700">חובה להזין שם משתמש</span>}
              </div>

              <div className="flex flex-col pt-4">
                <label className="text-lg">טוקן</label>
                <input
                  {...register("token", { required: true })}
                  placeholder="טוקן"
                  type="number"
                  className="text-right shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
                 {errors.token && <span className="text-red-700">חובה להזין טוקן</span>}
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
