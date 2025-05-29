import Success from "@/components/Success";
import { redirect } from "next/navigation";

const SuccessPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const orderNumber = (await searchParams).orderNumber;
  const sessionId = (await searchParams).session_id;

  if (!orderNumber && !sessionId) {
    return redirect("/");
  }

  return <Success />;
};

export default SuccessPage;
