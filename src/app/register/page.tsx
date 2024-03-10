import SessionProvider from "@/components/RestrictedPage"
import RegisterForm from "./form";

const Page = () => <SessionProvider page={RegisterForm} redirectIfSession="/app" />;

export default Page;

