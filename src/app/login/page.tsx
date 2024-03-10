import SessionProvider from "@/components/RestrictedPage"
import LoginForm from "./form";

const Page = () => <SessionProvider page={LoginForm} redirectIfSession="/app" />;

export default Page;

