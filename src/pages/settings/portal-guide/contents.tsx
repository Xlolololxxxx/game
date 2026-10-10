import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import palette from '@src/theme/palette';
import { useState } from 'react';
import DeactivateMailContent from './deactivate-mail-content';
import InboxMailContent from './inbox-mail-content';
import ManageMissionContent from './manage-mission-content';
import SideBarCategoryContent from './sidebar-category-content';
import { Box } from '@mui/material';

interface Props {
	options: any[];
}

const TableOfContents = (props: Props) => {
	const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

	const RenderItem = (section: any) => {
		switch(section.title){
			case "How to Upload an Inbox Mail Message":
				return <InboxMailContent />;
			case "How to Update, Activate, or Deactivate a Mail":
				return <DeactivateMailContent />;
			case "How to Manage Missions":
				return <ManageMissionContent />;
			case "How to Update the Game Platform Sidebar Categories Using the Admin Portal":
				return <SideBarCategoryContent />;
			default: 
			return (
				// <AccordionDetails>
				// 	<ol style={{paddingLeft: "20px"}}>
				// 		{section.steps.map((step: string, stepIndex: number) => (
				// 			<li key={stepIndex}>
				// 				<Typography fontSize={14}>
				// 					{step}
				// 				</Typography>
				// 			</li>
				// 		))}
				// 	</ol>
				// </AccordionDetails>
				<AccordionDetails>
					<Description2 text={section?.description ?? ""} />
					{/* <Typography fontSize={14}>
						{section?.description}
					</Typography> */}
				</AccordionDetails>
			)
		}

	}

	return (
    <Card sx={{ 
			width: "100%", height: "100%", 
			px: {
				xl: "30px",
				lg: "30px",
				md: "10px",
				sm: "10px",
				xs: "10px",
			}, py: "15px", borderRadius: "25px" }}>
			{props.options.map((section: any, index: number) => {
				const active = expanded === index.toString();

				return (
					<Accordion key={index.toString()}
						expanded={active} onChange={handleChange(index.toString())}>
						<AccordionSummary
							expandIcon={active ? <RemoveOutlinedIcon sx={{ color: palette.blue["main"]}}/> : <AddOutlinedIcon sx={{ color: palette.blue["md-light"]}}/>}
							aria-controls="panel1-content"
							id="panel1-header"
						>
							<Typography 
								fontFamily="Inter"
								fontWeight={700}
								color={active ? palette.blue.main : palette.blue["md-light"]} >{section.title}</Typography>
						</AccordionSummary>
						{RenderItem(section)}
					</Accordion>
				);
			})}
    </Card>
  );
}

type TagStyle = {
  fontWeight?: number;
  fontStyle?: "italic";
  textDecoration?: string;
};

const TAG_STYLES: Record<string, TagStyle> = {
  B: { fontWeight: 600 },
  I: { fontStyle: "italic" },
  U: { textDecoration: "underline" },
};

const parseTextWithTags = (text: string) => {
  const regex = /\[(B|I|U)\](.*?)\[\/\1\]/g;
  const result: React.ReactNode[] = [];

  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    const [fullMatch, tag, content] = match;
    const start = match.index;

    // Plain text before tag
    if (start > lastIndex) {
      result.push(
        <Box key={key++} component="span">
          {text.slice(lastIndex, start)}
        </Box>
      );
    }

    // Styled text
    result.push(
      <Box
        key={key++}
        component="span"
        sx={{
          ...TAG_STYLES[tag],
        }}
      >
        {content}
      </Box>
    );

    lastIndex = start + fullMatch.length;
  }

  // Remaining plain text
  if (lastIndex < text.length) {
    result.push(
      <Box key={key++} component="span">
        {text.slice(lastIndex)}
      </Box>
    );
  }

  return result;
};

const Description2 = ({ text }: { text: string }) => {
  return (
    <Typography
      sx={{
        whiteSpace: "pre-wrap", // supports \n + indentation
        fontSize: 14,
        lineHeight: 1.6,
      }}
    >
      {parseTextWithTags(text)}
    </Typography>
  );
};



export default TableOfContents