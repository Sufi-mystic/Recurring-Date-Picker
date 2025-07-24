import { notFound } from "next/navigation";
import doctors from "@/app/data/doctors.json";
import DoctorProfile from "@/app/Component/DoctorProfile";

type Props = {
  params: { id: string };
};

export default async function DoctorPage({ params }: Props)  {
  const doctor = doctors.find((doc) => doc.id === params.id);

  if (!doctor) return notFound();

  return <DoctorProfile doctor={doctor} />;
}
