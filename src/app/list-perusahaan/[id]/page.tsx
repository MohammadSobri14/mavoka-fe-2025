"use client";

import HeaderHome from "@/app/components/homePage/headerHomepage";
import "aos/dist/aos.css";
import Footer from "@/app/components/homePage/footer";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getCompanyById } from "@/services/company";
import { Company } from "@/types/company";
import DetailDescription from "@/app/components/homePage/detail-role/DetailDescription";
import DetailHeader from "@/app/components/homePage/detail-role/DetailHeader";
import CompanyDetail from "@/app/components/homePage/listPerusahaan/detail-perusahaan/CompanyDetail";
import { Container } from "@/app/components/Container";
import JobCard from "@/app/components/homePage/jobCard";
import { ArrowRight } from "lucide-react";

type Job = {
  id: number;
  judul_lowongan: string;
  posisi: string;
  kuota: number;
  lokasi_penempatan: string;
  deadline_lamaran: string;
  perusahaan: {
    nama_perusahaan: string;
    logo_perusahaan: string | null;
  };
};

export default function DetailPerusahaanPage() {
  const { id } = useParams();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    (async () => {
      const data = await getCompanyById(id as string);
      setCompany(data);
      setLoading(false);
    })();
  }, [id]);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!company)
    return <p className="text-center py-10">Data perusahaan tidak ditemukan</p>;

  return (
    <>
      <HeaderHome />
      <main>
        <Container className="py-6">
          <DetailHeader name={company.name} logo={company.logoUrl ?? undefined} />
          <CompanyDetail totalLowongan={company.totalLowongan} />
          <DetailDescription
            type="organisasi"
            title="Deskripsi Perusahaan"
            description={company.description ?? "-"}
            email={company.email ?? "-"}
            address={company.address ?? "-"}
          />

          <div className="mt-10 text-center">
            <h3>Temukan Posisi Magang Impianmu Di sini</h3>
          </div>

          {company.jobs && company.jobs.length > 0 ? (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">
                  Lowongan <span className="text-[#0F67B1]">Aktif</span>
                </h2>

                <a
                  href="/list-perusahaan"
                  className="text-[#0F67B1] hover:underline flex items-center gap-1"
                >
                  Lihat semua lowongan <ArrowRight size={20} />
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {company.jobs.map((job: Job) => (
                  <JobCard
                    key={job.id}
                    id={job.id}
                    companyLogo={job.perusahaan?.logo_perusahaan ?? null}
                    title={job.judul_lowongan}
                    company={job.perusahaan.nama_perusahaan}
                    location={job.lokasi_penempatan}
                    positions={job.kuota}
                    closingDate={job.deadline_lamaran}
                  />
                ))}
              </div>
            </>
          ) : (
            <p className="col-span-full text-center text-gray-500 mt-5">
              Belum ada lowongan dari perusahaan ini
            </p>
          )}
        </Container>
      </main>
      <Footer />
    </>
  );
}
