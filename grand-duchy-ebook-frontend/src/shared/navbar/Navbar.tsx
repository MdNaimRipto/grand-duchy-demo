import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/iStock-ASDASDASDASD(1) [Converted].png";
import {
  MdBookmarkBorder,
  MdOutlineWatchLater,
  MdOutlineSettings,
  MdOutlineSpeakerNotes,
  MdOutlineLocationOn,
} from "react-icons/md";
import { GoBook } from "react-icons/go";
import { IoHomeOutline } from "react-icons/io5";
import { useRouter } from "next/router";
import { colorConfig } from "@/configs/colorConfig";
import { LuLayoutDashboard } from "react-icons/lu";
import { IconButton, Tooltip } from "@mui/material";
import FontModal from "@/common/FontModal";
import { useUserContext } from "@/context/AuthContext";
import { IUser } from "@/types/userTypes";
import TimerModal from "./TimerModal";

const Navbar = ({
  setUiTheme,
  uiTheme,
}: {
  setUiTheme: any;
  uiTheme: "light" | "dark";
}) => {
  const router = useRouter();
  const [openFontModal, setOpenFontModal] = useState(false);
  const [openTimerModal, setOpenTimerModal] = useState(false);

  const { user } = useUserContext();
  const typedUser = user as IUser;

  const handleClose = () => setOpenFontModal(false);
  const navData = [
    { icon: IoHomeOutline, title: "Home", path: "/" },
    { icon: GoBook, title: "Book", path: "/book/67b74628fdf15484e3fc0e96" },
    { icon: MdBookmarkBorder, title: "Bookmark", path: "/bookmark" },
    { icon: MdOutlineSpeakerNotes, title: "Notes", path: "/adminNotes" },
    { icon: MdOutlineLocationOn, title: "Map", path: "/" },
  ];

  return (
    <>
      <div className="min-h-screen fixed w-[60px] shadow-md px-2 flex flex-col justify-center items-center">
        <Link
          href={"/"}
          className="hidden lg:block absolute top-4 left-1/2 transform -translate-x-1/2"
        >
          <Image
            className="w-full h-full"
            src={logo}
            alt="The Grand duchy logo"
            priority={true}
          />
        </Link>
        <div className="flex flex-col gap-8">
          {navData.map((data, index) => (
            <Link
              href={data.path}
              key={index}
              className={`text-2xl rounded-full ${
                router.asPath === data?.path
                  ? "bg-gray text-white"
                  : uiTheme === "light"
                  ? "text-black"
                  : "text-white"
              }`}
            >
              <Tooltip title={data.title}>
                <IconButton
                  sx={{
                    color:
                      router.asPath === data?.path
                        ? colorConfig.white
                        : uiTheme === "light"
                        ? colorConfig.black
                        : colorConfig.white,
                  }}
                >
                  {
                    <data.icon
                    // className={`${
                    //   uiTheme === "light" ? "text-black" : "text-white"
                    // }`}
                    />
                  }
                </IconButton>
              </Tooltip>
            </Link>
          ))}
          {user && typedUser?.userType === "ADMIN" && (
            <Link
              href={"/dashboard?tab=0"}
              className={`text-2xl rounded-full ${
                router.pathname === "/dashboard"
                  ? "bg-gray text-white"
                  : uiTheme === "light"
                  ? "text-black"
                  : "text-white"
              }`}
            >
              <Tooltip title={"Dashboard"}>
                <IconButton
                  sx={{
                    color:
                      router.pathname === "/dashboard"
                        ? colorConfig.white
                        : uiTheme === "light"
                        ? colorConfig.black
                        : colorConfig.white,
                  }}
                >
                  <LuLayoutDashboard />
                </IconButton>
              </Tooltip>
            </Link>
          )}
        </div>

        <div className="mt-8">
          <IconButton
            className="text-2xl rounded-full transition-all"
            onClick={() => setOpenTimerModal(true)}
          >
            <MdOutlineWatchLater
              className={`${uiTheme === "light" ? "text-black" : "text-white"}`}
            />
          </IconButton>
        </div>

        <div className="mt-8">
          <Tooltip title="Settings">
            <IconButton
              onClick={() => setOpenFontModal(true)}
              className="text-2xl  rounded-full transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              disabled={!router.pathname.startsWith("/book")}
            >
              <MdOutlineSettings
                className={`${
                  uiTheme === "light" ? "text-black" : "text-white"
                }`}
              />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      {openFontModal && (
        <FontModal handleClose={handleClose} open={openFontModal} />
      )}
      {openTimerModal && <TimerModal setOpenTimerModal={setOpenTimerModal} />}
    </>
  );
};

export default Navbar;
