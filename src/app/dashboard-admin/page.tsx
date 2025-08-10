import DashboardLayout from "@/app/components/dashboard/layout";
import { Card } from "flowbite-react";
import CardList from "@/app/components/dashboard/admin/CardList";
import LineChartAdmin from "@/app/components/dashboard/admin/LineChartAdmin";
import { CardPelamar } from "@/app/components/dashboard/admin/CardPelamar";
import { CardPemagang } from "@/app/components/dashboard/admin/CardPemagang";
import { TotalPresentasePemagang } from "@/app/components/dashboard/admin/TotalPresentasePemagang";
import { DetailVerifikasi } from "@/app/components/dashboard/admin/DetailVerifikasi";

export default function DashboardAdmin() {
  return (
    <DashboardLayout role="admin">
      <div className="ml-5 mt-2 mr-5">
        <h1 className="font-bold text-[#0F67B1]">SELAMAT DATANG</h1>
        <p className="text-[#A3A3A3] mb-10">
          Hi, Minvo. Selamat datang kembali di MAVOKA Admin Dashboard!
        </p>

        <div className="flex flex-col gap-4">
          <CardList />

          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-3">
              <LineChartAdmin />
            </div>

            <div className="grid grid-rows-2 gap-4">
              <CardPelamar />
              <CardPemagang />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-[1.5fr_2.5fr] gap-4 mt-5">
          <Card>
            <TotalPresentasePemagang />
          </Card>
          <Card>
            <DetailVerifikasi />
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
