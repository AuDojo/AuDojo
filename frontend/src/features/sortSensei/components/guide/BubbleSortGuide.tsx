import { Trans, useTranslation } from "react-i18next";
import SortGuide from "./SortGuide";

const BubbleSortGuide = () => {
  const { t } = useTranslation("sortsensei", { keyPrefix: "bubbleSort.guide" });

  const getCurrentGuideText = () => {
    return (
      <ol>
        <li>
          <Trans i18nKey="goThroughArray" t={t} />
        </li>
        <li>
          <Trans i18nKey="compare" t={t} />
        </li>
        <li>
          <Trans i18nKey="swap" t={t} />
        </li>
        <li>
          <Trans i18nKey="repeat" t={t} />
        </li>
      </ol>
    );
  };

  const hint = (
    <ul>
      <li>
        <Trans i18nKey="hint" t={t} />
      </li>
    </ul>
  );

  return <SortGuide heading={t("heading")} guideText={getCurrentGuideText()} hint={hint} />;
};

export default BubbleSortGuide;
