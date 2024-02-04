import { InfoDisplayer } from "@/lib/components/ui/InfoDisplayer/InfoDisplayer";

import styles from "./Settings.module.scss";

import { ApiKeyConfig } from "../ApiKeyConfig";
import LanguageSelect from "../LanguageSelect/LanguageSelect";
import { LogoutModal } from "../LogoutModal/LogoutModal";

type InfoDisplayerProps = {
  email: string;
};

export const Settings = ({ email }: InfoDisplayerProps): JSX.Element => {
  return (
    <div className={styles.settings_wrapper}>
      <InfoDisplayer label="Email" iconName="email">
        <span>{email}</span>
      </InfoDisplayer>
      <LanguageSelect />
      <ApiKeyConfig />
      <LogoutModal />
    </div>
  );
};
