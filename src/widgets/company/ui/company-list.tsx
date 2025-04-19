import type { TCompanyData } from "~/entities/company/model/company.model";
import CompanyCard from "./company-card";
import { FlexColG4 } from "~/shared/ui/templates/common";

const CompanyList = ({ list }: { list: TCompanyData[] }) => {
  return (
    <FlexColG4>
      {list.map((it) => (
        <CompanyCard item={it} key={it.company.id} />
      ))}
    </FlexColG4>
  );
};

export default CompanyList;
