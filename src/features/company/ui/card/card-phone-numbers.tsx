import type { TCompanyData } from "~/entities/company/model/company.model";

const CardPhoneNumbers = ({ phones }: { phones: TCompanyData["phones"] }) => {
  return (
    <>
      <span className="font-medium">Номера телефонов:</span>
      {phones?.map((it) => <span key={it.id}>{it?.phoneNumber}</span>)}
    </>
  );
};

export default CardPhoneNumbers;
