import Loader from "@/common/loader/Loader";
import { SuccessToast } from "@/common/toasts/SuccessToast";
import OpacityAnimation from "@/components/animation/OpacityAnimation";
import { useGetAllUsersQuery } from "@/redux/features/userApi";
import { IUser } from "@/types/userTypes";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { GoCopy } from "react-icons/go";

const UserTab = () => {
  const { data, isLoading, error } = useGetAllUsersQuery({});

  if (isLoading) {
    return <Loader />;
  }

  if (!data || error) {
    return <p>Something went wrong</p>;
  }

  const users = data.data as Partial<IUser>[];

  const copyToClipboard = (email: string) => {
    if (!email) return;
    navigator.clipboard.writeText(email);
    SuccessToast("Email copied to clipboard!");
  };

  const formatActiveTime = (totalActive: number) => {
    // Convert milliseconds to total minutes
    const totalMinutes = Math.floor(totalActive / (1000 * 60));

    // Calculate hours and minutes
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    // Return formatted string (e.g., "2 hours 30 minutes")
    return `${hours} hours ${minutes} minutes`;
  };

  return (
    <OpacityAnimation>
      <>
        <div className="flex justify-between items-center md:p-4">
          <h2 className="text-xl text-primary font-bold">User Details</h2>
        </div>
        <div className="my-12 mx-0 md:mx-4 md:pe-4 w-full">
          <TableContainer
            component={Paper}
            sx={{ minHeight: "70vh", maxHeight: "70vh", overflow: "auto" }}
          >
            <Table sx={{ width: "100%" }} aria-label="simple table">
              <TableHead sx={{ position: "sticky", top: 0, zIndex: 30 }}>
                <TableRow
                  sx={{ background: "#e2e2e2 !important", fontWeight: 600 }}
                >
                  <TableCell align="center">Id</TableCell>
                  <TableCell align="center">User Name</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Active Time</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((data, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" align="center">
                      {index + 1}
                    </TableCell>
                    <TableCell component="th" align="center">
                      {data.userName}
                    </TableCell>
                    <TableCell component="th" align="center">
                      {data.email}
                    </TableCell>
                    <TableCell component="th" align="center">
                      {formatActiveTime(Number(data.totalActive))}
                    </TableCell>

                    <TableCell component="th" align="center">
                      <div className="flex justify-center ">
                        <GoCopy
                          className="text-lg text-success cursor-pointer"
                          onClick={() => copyToClipboard(data.email || "")}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </>
    </OpacityAnimation>
  );
};

export default UserTab;
