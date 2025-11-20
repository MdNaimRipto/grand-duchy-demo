import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Masonry from "@mui/lab/Masonry";
import { colorConfig } from "@/configs/colorConfig";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { ISummary } from "@/types/summaryTypes";
import DeleteApiHandler from "@/common/apiHandlers/DeleteApiHandler";
import { useDeleteSummaryMutation } from "@/redux/features/summaryApi";
import { useMediaQuery } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import UpdateBookmarkForm from "./UpdateBookmarkForm";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: colorConfig.white,
  ...theme.typography.body2,
  padding: theme.spacing(3),
  textAlign: "start",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: colorConfig.primary,
  }),
}));

const BookmarkTable = ({
  summaries,
  refetch,
}: {
  summaries: ISummary[];
  refetch: () => void;
}) => {
  const [open, setOpen] = useState(false);
  const [selectedSummary, setSelectedSummary] = useState<ISummary | null>(null);

  const isMobile = useMediaQuery("(max-width: 640px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");
  const [deleteSummary] = useDeleteSummaryMutation();
  return (
    <div className="my-12">
      <Box
        sx={{
          color: colorConfig.primary,
          borderColor: colorConfig.primary,
          borderRadius: 2,
        }}
      >
        <Masonry columns={isMobile ? 1 : isTablet ? 2 : 3} spacing={2}>
          {summaries.map((data, index) => (
            <Item
              key={index}
              sx={{
                backgroundColor: `#00000000 !important`,
                border: `1px solid ${colorConfig.secondary}`,
                borderRadius: "10px",
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 2,
              }}
            >
              <div className="w-full h-full overflow-hidden text-primary mb-3">
                <Image
                  className="w-full h-full object-contain"
                  width={150}
                  height={150}
                  src={data.image && data.image !== "empty" ? data.image : ""}
                  alt={
                    data.image && data.image !== "empty"
                      ? "Character Image"
                      : "Image wasn't found"
                  }
                />
              </div>
              <div>
                <div className="flex justify-between">
                  <h4 className="text-xl font-semibold mb-2 text-darkGray">
                    {data.characterName}
                  </h4>
                  <div className="flex items-center gap-4">
                    <DeleteApiHandler
                      deleteFn={deleteSummary}
                      id={String(data._id)}
                      refetch={refetch}
                    />
                    <EditNoteIcon
                      sx={{ color: colorConfig.gray, fontSize: "30px" }}
                      onClick={() => {
                        setSelectedSummary(data);
                        setOpen(true);
                      }}
                    />
                  </div>
                </div>

                <p className="text-sm font-medium mb-2 text-primary">
                  Act: <span className="font-semibold">{data.actTitle}</span>
                </p>

                <p className="text-sm font-medium mb-2 text-primary">
                  Chapter:{" "}
                  <span className="font-semibold text-primary">
                    {data.chapterTitle}
                  </span>
                </p>

                <p className="text-sm font-medium mb-2 text-primary">
                  Episode:{" "}
                  <span className="font-semibold text-primary">
                    {data.episodeTitle}
                  </span>
                </p>

                <p className="text-base text-primary">{data.summary}</p>
              </div>
            </Item>
          ))}
        </Masonry>
      </Box>
      {
        <UpdateBookmarkForm
          summary={selectedSummary}
          open={open}
          setOpen={setOpen}
          refetch={refetch}
        />
      }
    </div>
  );
};

export default BookmarkTable;
