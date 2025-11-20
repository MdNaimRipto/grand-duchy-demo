import { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Tabs, Tab } from "@mui/material";
import BooksTab from "@/components/dashboard/tabs/BooksTab";
import CharacterTab from "@/components/dashboard/tabs/CharacterTab";
import BookmarkTab from "@/components/dashboard/tabs/BookmarkTab";
import QuotesTab from "@/components/dashboard/tabs/QuotesTab";
import MainLayout from "@/Layouts/MainLayout";
import UserTab from "@/components/dashboard/tabs/UserTab";
import UpdateTimerTab from "@/components/dashboard/tabs/UpdateTimerTab";
import AdminWrapper from "@/Layouts/AdminWrapper";
import AdminTab from "@/components/dashboard/tabs/AdminTab";
import { color } from "framer-motion";
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

const Dashboard = () => {
  const router = useRouter();
  const tabFromQuery = parseInt(router.query.tab as string) || 0;
  const [value, setValue] = useState(tabFromQuery);

  useEffect(() => {
    if (value !== tabFromQuery) {
      setValue(tabFromQuery);
    }
  }, [tabFromQuery, value]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    router.push(
      {
        pathname: router.pathname,
        query: { tab: newValue },
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <div className="container md:px-4">
      <Box sx={{ width: "100%", my: 4 }}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            color: colorConfig.primary,
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs"
            sx={{
              color: colorConfig.primary,
              "& .MuiTabs-indicator": {
                backgroundColor: colorConfig.darkGray,
              },
            }}
          >
            <Tab
              sx={{
                color: colorConfig.primary,
                "&.Mui-selected": {
                  color: colorConfig.darkGray,
                },
              }}
              label="Books"
              {...a11yProps(0)}
            />
            <Tab
              sx={{
                color: colorConfig.primary,
                "&.Mui-selected": {
                  color: colorConfig.darkGray,
                },
              }}
              label="Characters"
              {...a11yProps(1)}
            />
            <Tab
              sx={{
                color: colorConfig.primary,
                "&.Mui-selected": {
                  color: colorConfig.darkGray,
                },
              }}
              label="Bookmarks"
              {...a11yProps(2)}
            />
            <Tab
              sx={{
                color: colorConfig.primary,
                "&.Mui-selected": {
                  color: colorConfig.darkGray,
                },
              }}
              label="Quotes"
              {...a11yProps(3)}
            />
            <Tab
              sx={{
                color: colorConfig.primary,
                "&.Mui-selected": {
                  color: colorConfig.darkGray,
                },
              }}
              label="Admin Notes"
              {...a11yProps(4)}
            />
            <Tab
              sx={{
                color: colorConfig.primary,
                "&.Mui-selected": {
                  color: colorConfig.darkGray,
                },
              }}
              label="User Details"
              {...a11yProps(5)}
            />
            <Tab
              sx={{
                color: colorConfig.primary,
                "&.Mui-selected": {
                  color: colorConfig.darkGray,
                },
              }}
              label="Upcoming timer"
              {...a11yProps(6)}
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <BooksTab />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <CharacterTab />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <BookmarkTab />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <QuotesTab />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
          <AdminTab />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={5}>
          <UserTab />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={6}>
          <UpdateTimerTab />
        </CustomTabPanel>
      </Box>
    </div>
  );
};

export default Dashboard;

Dashboard.getLayout = (page: ReactElement) => (
  <AdminWrapper>
    <MainLayout>{page}</MainLayout>
  </AdminWrapper>
);
