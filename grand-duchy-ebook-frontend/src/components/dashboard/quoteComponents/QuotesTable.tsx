import { useState } from "react";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { IQuote } from "@/types/quotesType";
import DeleteApiHandler from "@/common/apiHandlers/DeleteApiHandler";
import { useDeleteQuoteMutation } from "@/redux/features/quoteApi";
import UpdateQuotesForm from "./UpdateQuotesForm";

const QuotesTable = ({
  quotesData,
  refetch,
}: {
  quotesData: IQuote[];
  refetch: () => void;
}) => {
  const [showUpdateQuoteForm, setShowUpdateQuoteForm] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<IQuote | null>(null);

  const [deleteQuotes] = useDeleteQuoteMutation();

  return (
    <>
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
              <TableCell align="center">Author</TableCell>
              <TableCell align="center">Quote</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {quotesData.map((data, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" align="center">
                  {index + 1}
                </TableCell>
                <TableCell component="th" align="center">
                  {data.author}
                </TableCell>
                <TableCell component="th" align="left">
                  {data.quote}
                </TableCell>

                <TableCell component="th" align="center">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedQuote(data); // Set selected quote
                        setShowUpdateQuoteForm(true); // Open modal
                      }}
                    >
                      <EditNoteIcon sx={{ fontSize: "30px" }} />
                    </button>
                    <DeleteApiHandler
                      deleteFn={deleteQuotes}
                      id={String(data._id)}
                      refetch={refetch}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {showUpdateQuoteForm && selectedQuote && (
        <UpdateQuotesForm
          setShowUpdateQuoteForm={setShowUpdateQuoteForm}
          quote={selectedQuote}
          refetch={refetch}
        />
      )}
    </>
  );
};

export default QuotesTable;
