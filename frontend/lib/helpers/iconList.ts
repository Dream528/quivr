import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BiCoin } from "react-icons/bi";
import {
  BsArrowRightShort,
  BsChatLeftText,
  BsFiletypeCsv,
  BsFiletypeDocx,
  BsFiletypeHtml,
  BsFiletypeMd,
  BsFiletypeMp3,
  BsFiletypeMp4,
  BsFiletypePdf,
  BsFiletypePptx,
  BsFiletypePy,
  BsFiletypeTxt,
  BsFiletypeXls,
  BsFiletypeXlsx,
  BsTextParagraph,
} from "react-icons/bs";
import { CgSoftwareDownload } from "react-icons/cg";
import { CiFlag1 } from "react-icons/ci";
import {
  FaCalendar,
  FaCheck,
  FaCheckCircle,
  FaDiscord,
  FaFile,
  FaFileAlt,
  FaFolder,
  FaGithub,
  FaLinkedin,
  FaQuestionCircle,
  FaRegFileAlt,
  FaRegFileAudio,
  FaRegKeyboard,
  FaRegStar,
  FaRegThumbsDown,
  FaRegThumbsUp,
  FaRegUserCircle,
  FaSort,
  FaTwitter,
  FaUnlock,
} from "react-icons/fa";
import { FaInfo } from "react-icons/fa6";
import { FiUpload } from "react-icons/fi";
import { GoLightBulb } from "react-icons/go";
import { HiBuildingOffice } from "react-icons/hi2";
import {
  IoIosAdd,
  IoIosHelpCircleOutline,
  IoIosRadio,
  IoMdClose,
  IoMdLogOut,
  IoMdSettings,
  IoMdSync,
} from "react-icons/io";
import {
  IoArrowUpCircleOutline,
  IoBookOutline,
  IoCloudDownloadOutline,
  IoFootsteps,
  IoHomeOutline,
  IoShareSocial,
  IoWarningOutline,
} from "react-icons/io5";
import { LiaFileVideo, LiaRobotSolid } from "react-icons/lia";
import { IconType } from "react-icons/lib";
import {
  LuArrowLeftFromLine,
  LuBrain,
  LuBrainCircuit,
  LuChevronDown,
  LuChevronLeft,
  LuChevronRight,
  LuCopy,
  LuExternalLink,
  LuGoal,
  LuPlusCircle,
  LuSearch,
} from "react-icons/lu";
import {
  MdDarkMode,
  MdDashboardCustomize,
  MdDeleteOutline,
  MdDynamicFeed,
  MdHistory,
  MdLink,
  MdMarkEmailRead,
  MdMarkEmailUnread,
  MdOutlineLightMode,
  MdOutlineMail,
  MdOutlineModeEditOutline,
  MdOutlineVpnKey,
  MdUnfoldLess,
  MdUnfoldMore,
  MdUploadFile,
} from "react-icons/md";
import { PiOfficeChairFill } from "react-icons/pi";
import {
  RiDeleteBackLine,
  RiHashtag,
  RiNotification2Line,
} from "react-icons/ri";
import { SlOptions } from "react-icons/sl";
import { TbNetwork, TbRobot } from "react-icons/tb";
import { VscGraph } from "react-icons/vsc";

export const iconList: { [name: string]: IconType } = {
  add: LuPlusCircle,
  addWithoutCircle: IoIosAdd,
  assistant: TbRobot,
  back: RiDeleteBackLine,
  bib: FaFile,
  brain: LuBrain,
  brainCircuit: LuBrainCircuit,
  calendar: FaCalendar,
  chair: PiOfficeChairFill,
  chat: BsChatLeftText,
  check: FaCheck,
  checkCircle: FaCheckCircle,
  chevronDown: LuChevronDown,
  chevronLeft: LuChevronLeft,
  chevronRight: LuChevronRight,
  close: IoMdClose,
  coin: BiCoin,
  copy: LuCopy,
  custom: MdDashboardCustomize,
  delete: MdDeleteOutline,
  discord: FaDiscord,
  docx: BsFiletypeDocx,
  download: IoCloudDownloadOutline,
  edit: MdOutlineModeEditOutline,
  email: MdOutlineMail,
  epub: FaFile,
  eureka: GoLightBulb,
  externLink: LuExternalLink,
  feed: MdDynamicFeed,
  file: FaRegFileAlt,
  fileSelected: FaFileAlt,
  flag: CiFlag1,
  fold: MdUnfoldLess,
  folder: FaFolder,
  followUp: IoArrowUpCircleOutline,
  github: FaGithub,
  goal: LuGoal,
  graph: VscGraph,
  hashtag: RiHashtag,
  help: IoIosHelpCircleOutline,
  hide: LuArrowLeftFromLine,
  history: MdHistory,
  home: IoHomeOutline,
  html: BsFiletypeHtml,
  info: FaInfo,
  ipynb: BsFiletypePy,
  key: MdOutlineVpnKey,
  link: MdLink,
  linkedin: FaLinkedin,
  loader: AiOutlineLoading3Quarters,
  logout: IoMdLogOut,
  m4a: LiaFileVideo,
  markdown: BsFiletypeMd,
  md: BsFiletypeMd,
  moon: MdDarkMode,
  mp3: BsFiletypeMp3,
  mp4: BsFiletypeMp4,
  mpga: FaRegFileAudio,
  mpeg: LiaFileVideo,
  notifications: RiNotification2Line,
  office: HiBuildingOffice,
  odt: BsFiletypeDocx,
  options: SlOptions,
  paragraph: BsTextParagraph,
  pptx: BsFiletypePptx,
  prompt: FaRegKeyboard,
  py: BsFiletypePy,
  question: FaQuestionCircle,
  radio: IoIosRadio,
  read: MdMarkEmailRead,
  redirection: BsArrowRightShort,
  robot: LiaRobotSolid,
  search: LuSearch,
  settings: IoMdSettings,
  share: IoShareSocial,
  software: CgSoftwareDownload,
  sort: FaSort,
  sources: IoBookOutline,
  star: FaRegStar,
  step: IoFootsteps,
  sun: MdOutlineLightMode,
  sync: IoMdSync,
  telegram: BsFiletypeDocx,
  thumbsDown: FaRegThumbsDown,
  thumbsUp: FaRegThumbsUp,
  twitter: FaTwitter,
  unfold: MdUnfoldMore,
  unlock: FaUnlock,
  unread: MdMarkEmailUnread,
  upload: FiUpload,
  uploadFile: MdUploadFile,
  user: FaRegUserCircle,
  warning: IoWarningOutline,
  wav: FaRegFileAudio,
  webm: LiaFileVideo,
  website: TbNetwork,
  xls: BsFiletypeXls,
  xlsx: BsFiletypeXlsx,
  txt: BsFiletypeTxt,
  csv: BsFiletypeCsv,
  pdf: BsFiletypePdf,
};
