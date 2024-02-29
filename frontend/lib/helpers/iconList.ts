import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  BsArrowRightShort,
  BsChatLeftText,
  BsTextParagraph,
} from "react-icons/bs";
import { CgSoftwareDownload } from "react-icons/cg";
import { CiFlag1 } from "react-icons/ci";
import {
  FaCheck,
  FaCheckCircle,
  FaFileAlt,
  FaKey,
  FaRegFileAlt,
  FaRegKeyboard,
  FaRegStar,
  FaRegUserCircle,
  FaUnlock,
} from "react-icons/fa";
import { FaInfo } from "react-icons/fa6";
import { FiUpload } from "react-icons/fi";
import {
  IoIosAdd,
  IoIosHelpCircleOutline,
  IoMdClose,
  IoMdLogOut,
} from "react-icons/io";
import {
  IoArrowUpCircleOutline,
  IoCloudDownloadOutline,
  IoHomeOutline,
  IoSettingsSharp,
  IoShareSocial,
  IoWarningOutline,
} from "react-icons/io5";
import { LiaRobotSolid } from "react-icons/lia";
import { IconType } from "react-icons/lib";
import {
  LuBrain,
  LuBrainCircuit,
  LuChevronDown,
  LuChevronLeft,
  LuChevronRight,
  LuCopy,
  LuPlusCircle,
  LuSearch,
} from "react-icons/lu";
import {
  MdAlternateEmail,
  MdDashboardCustomize,
  MdDeleteOutline,
  MdDynamicFeed,
  MdHistory,
  MdLink,
  MdOutlineModeEditOutline,
  MdUploadFile,
} from "react-icons/md";
import { RiHashtag } from "react-icons/ri";
import { SlOptions } from "react-icons/sl";
import { TbNetwork } from "react-icons/tb";
import { VscGraph } from "react-icons/vsc";

export const iconList: { [name: string]: IconType } = {
  add: LuPlusCircle,
  addWithoutCircle: IoIosAdd,
  brain: LuBrain,
  brainCircuit: LuBrainCircuit,
  chat: BsChatLeftText,
  check: FaCheck,
  checkCircle: FaCheckCircle,
  chevronDown: LuChevronDown,
  chevronLeft: LuChevronLeft,
  chevronRight: LuChevronRight,
  close: IoMdClose,
  copy: LuCopy,
  custom: MdDashboardCustomize,
  delete: MdDeleteOutline,
  download: IoCloudDownloadOutline,
  edit: MdOutlineModeEditOutline,
  email: MdAlternateEmail,
  feed: MdDynamicFeed,
  file: FaRegFileAlt,
  fileSelected: FaFileAlt,
  flag: CiFlag1,
  followUp: IoArrowUpCircleOutline,
  graph: VscGraph,
  hashtag: RiHashtag,
  help: IoIosHelpCircleOutline,
  history: MdHistory,
  home: IoHomeOutline,
  info: FaInfo,
  key: FaKey,
  link: MdLink,
  loader: AiOutlineLoading3Quarters,
  logout: IoMdLogOut,
  options: SlOptions,
  paragraph: BsTextParagraph,
  prompt: FaRegKeyboard,
  redirection: BsArrowRightShort,
  robot: LiaRobotSolid,
  search: LuSearch,
  settings: IoSettingsSharp,
  share: IoShareSocial,
  software: CgSoftwareDownload,
  star: FaRegStar,
  unlock: FaUnlock,
  upload: FiUpload,
  uploadFile: MdUploadFile,
  user: FaRegUserCircle,
  warning: IoWarningOutline,
  website: TbNetwork,
};
