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
import { ICharacter } from "@/types/characterTypes";
import { useDeleteCharacterMutation } from "@/redux/features/characterApi";
import DeleteApiHandler from "@/common/apiHandlers/DeleteApiHandler";
import Image from "next/image";
import UpdateCharacterForm from "./UpdateCharacterForm";

const CharacterTable = ({
  characterData,
  refetch,
}: {
  characterData: ICharacter[];
  refetch: () => void;
}) => {
  const [showUpdateCharacterForm, setShowUpdateCharacterForm] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<ICharacter | null>(
    null
  );

  const [deleteCharacter] = useDeleteCharacterMutation();

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
              <TableCell align="center">Image</TableCell>
              <TableCell align="center">Character Name</TableCell>
              <TableCell align="center">Summary</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {characterData.map((data, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" align="center">
                  {index + 1}
                </TableCell>
                <TableCell component="th" align="center">
                  <Image
                    src={data.image}
                    alt="Character Image"
                    width={300}
                    height={300}
                    priority
                    className="w-[120px] h-[120px] object-contain"
                  />
                </TableCell>
                <TableCell component="th" align="center">
                  {data.name}
                </TableCell>
                <TableCell component="th" align="left">
                  {data.summery}
                </TableCell>

                <TableCell component="th" align="center">
                  <button
                    onClick={() => {
                      setSelectedCharacter(data); // Set the selected character
                      setShowUpdateCharacterForm(true); // Open modal
                    }}
                  >
                    <EditNoteIcon sx={{ fontSize: "30px" }} />
                  </button>
                  <DeleteApiHandler
                    deleteFn={deleteCharacter}
                    id={String(data._id)}
                    refetch={refetch}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {showUpdateCharacterForm && selectedCharacter && (
        <UpdateCharacterForm
          setShowUpdateCharacterForm={setShowUpdateCharacterForm}
          character={selectedCharacter}
          refetch={refetch}
        />
      )}
    </>
  );
};

export default CharacterTable;
