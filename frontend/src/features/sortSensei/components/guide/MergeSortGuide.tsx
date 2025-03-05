// MergeSortGuide.tsx
import { Trans, useTranslation } from "react-i18next";
import SortGuide from "./SortGuide";

const MergeSortGuide = () => {
  const { t } = useTranslation("sortsensei", { keyPrefix: "mergeSort.guide" });

  const getCurrentGuideText = () => {
    return (
      <ol>
        <li>
          <Trans i18nKey="splitting" t={t} />
        </li>
        <li>
          <Trans i18nKey="keep-splitting" t={t} />
        </li>
        <li>
          <Trans i18nKey="merge" t={t} />
        </li>
      </ol>
    );
  };

  const hint = (
    <ul>
      <li>
        <Trans i18nKey="hint.odd" t={t} />
      </li>
      <li>
        <Trans i18nKey="hint.ignore" t={t} />
      </li>
    </ul>
  );

  return <SortGuide heading={t("heading")} guideText={getCurrentGuideText()} hint={hint} />;
};

export default MergeSortGuide;
