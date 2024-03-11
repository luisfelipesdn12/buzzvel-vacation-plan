import SessionProvider from "@/components/SessionProvider";
import RegisterForm from "./form";

const Page = () => <SessionProvider page={RegisterForm} redirectIfSession="/app" />;

export default Page;

