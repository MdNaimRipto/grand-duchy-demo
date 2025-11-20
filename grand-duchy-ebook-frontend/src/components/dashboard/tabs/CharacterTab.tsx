import Loader from "@/common/loader/Loader";
import OpacityAnimation from "@/components/animation/OpacityAnimation";
import AddCharacterForm from "@/components/dashboard/characterComponents/AddCharacterForm";
import CharacterTable from "@/components/dashboard/characterComponents/CharacterTable";
import { colorConfig } from "@/configs/colorConfig";
import { useGetCharacterQuery } from "@/redux/features/characterApi";
import { ICharacter } from "@/types/characterTypes";
import { Button } from "@mui/material";
import { useState } from "react";

const CharacterTab = () => {
  const [showCharacterForm, setShowCharacterForm] = useState(false);
  const { data, isLoading, error, refetch } = useGetCharacterQuery({});

  if (isLoading) {
    return <Loader />;
  }

  if (!data || error) {
    return <p>Something went wrong</p>;
  }

  const characters = data.data as ICharacter[];
  return (
    <>
      <OpacityAnimation>
        <>
          <div className="flex justify-between items-center md:p-4">
            <h2 className="text-xl text-primary font-bold">
              Character Summary
            </h2>
            <Button
              onClick={() => setShowCharacterForm(true)}
              variant="contained"
              sx={{
                color: colorConfig.white,
                background: colorConfig.primary,
                fontWeight: 600,
                padding: {
                  xs: "8px 10px",
                  sm: "12px 24px",
                },
                transition: ".8s",
                "&:hover": {
                  color: colorConfig.primary,
                  borderColor: colorConfig.primary,
                  background: colorConfig.secondary,
                },
              }}
            >
              Add New Character
            </Button>
          </div>
          <div className="my-12 mx-0 md:mx-4 md:pe-4 w-full">
            {/* <div className="w-full grid grid-cols-1 md:grid-cols-2 items-center gap-4 mb-6">
          <h6 className="text-lg text-green font-medium">
            Select Filter Options:
          </h6>
        </div> */}

            <CharacterTable characterData={characters} refetch={refetch} />
            {/* <PaginationComponent
          count={pagination.total}
          page={page}
          setPage={setPage}
          limit={limit}
        /> */}
          </div>
        </>
      </OpacityAnimation>
      {showCharacterForm && (
        <AddCharacterForm
          setShowCharacterForm={setShowCharacterForm}
          refetch={refetch}
        />
      )}
    </>
  );
};

export default CharacterTab;
