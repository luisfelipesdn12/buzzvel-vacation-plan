import SessionProvider from "@/components/SessionProvider"
import LoginForm from "./form";

const Page = () => <SessionProvider page={LoginForm} redirectIfSession="/app" />;

export default Page;

