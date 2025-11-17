import OpacityAnimation from "@/components/animation/OpacityAnimation";
import MainLayout from "@/Layouts/MainLayout";
import Image from "next/image";
import { ReactElement, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import authorImage from "@/assets/images/hero.png";
import { useGetLatestNoteQuery } from "@/redux/features/notesApi";
import Loader from "@/common/loader/Loader";
import { INote } from "@/types/noteTypes";
import { colorConfig } from "@/configs/colorConfig";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const AdminNotes = () => {
  const [value, setValue] = useState(0);
  const { data, isLoading, error, refetch } = useGetLatestNoteQuery({});

  if (isLoading) {
    return <Loader />;
  }

  if (!data || error) {
    return <p>Something went wrong</p>;
  }

  const note = data.data as INote;

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <OpacityAnimation>
      <div className="my-12 grid grid-cols-1  md:grid-cols-2 justify-center gap-4 ">
        <div className="flex items-center justify-center order-2 md:order-1">
          <Image src={authorImage} alt="" />
        </div>
        <div className="order-1 md:order-2">
          <Box sx={{ width: "100%" }}>
            <Box>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                textColor="inherit"
                sx={{
                  color: colorConfig.primary,
                  "& .MuiTabs-indicator": {
                    backgroundColor: colorConfig.primary,
                  },
                }}
              >
                <Tab
                  label="Note from Author"
                  {...a11yProps(0)}
                  sx={{
                    color: colorConfig.primary,
                    "&.Mui-selected": {
                      color: colorConfig.primary,
                    },
                  }}
                />
                <Tab
                  label="About Author"
                  {...a11yProps(1)}
                  sx={{
                    color: colorConfig.primary,
                    "&.Mui-selected": {
                      color: colorConfig.primary,
                    },
                  }}
                />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <p
                className="text-sm text-justify max-h-[50vh] overflow-y-auto flex flex-col gap-4"
                dangerouslySetInnerHTML={{
                  __html: note?.note,
                }}
              />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <div className="flex items-center min-h-[100px] md:min-h-[300px]">
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod
                  voluptas, earum deleniti voluptate exercitationem aspernatur
                  cum minima officia est illum?
                </p>
              </div>
            </CustomTabPanel>
          </Box>
        </div>
      </div>
    </OpacityAnimation>
  );
};

export default AdminNotes;

AdminNotes.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;
