import Link from "next/link";
import { useTranslation } from "react-i18next";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { LuChevronRight } from "react-icons/lu";
import { RiTwitterXLine } from "react-icons/ri";

import Button from "@/lib/components/ui/Button";
import { GITHUB_URL, LINKEDIN_URL, TWITTER_URL } from "@/lib/config/CONSTANTS";

export const FooterSection = (): JSX.Element => {
  const { t } = useTranslation("home", { keyPrefix: "footer" });

  return (
    <div className="flex flex-col items-center gap-10 text-white text-center text-lg">
      <h2 className="text-3xl">{t("title")}</h2>
      <p>
        {t("description_1")} <br /> {t("description_2")}{" "}
      </p>
      <div className="flex items-center">
        <Link href="/signup">
          <Button className=" rounded-full">
            {t("start_using")}
            <LuChevronRight size={24} />
          </Button>
        </Link>
        <Button variant="tertiary">
          {t("contact_sales")} <LuChevronRight size={24} />
        </Button>
      </div>
      <ul className="flex gap-10 mt-5 mb-10 text-black">
        <li>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Quivr LinkedIn"
            className="hover:text-black"
          >
            <FaLinkedin size={52} />
          </a>
        </li>
        <li>
          <a
            href={TWITTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Quivr Twitter"
            className="hover:text-black"
          >
            <RiTwitterXLine size={52} />
          </a>
        </li>
        <li>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Quivr GitHub"
            className="hover:text-black"
          >
            <FaGithub size={52} />
          </a>
        </li>
      </ul>
    </div>
  );
};
