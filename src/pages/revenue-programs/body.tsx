import { Box, Button, Container, Tab, Tabs } from '@mui/material'
import { useAccessControlContext } from '@src/context/AccessControl'
import DomToImage from 'dom-to-image'
import jsPDF from 'jspdf'
import moment from 'moment'
import { useMemo, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import GPRevenue from './gp-revenue/index'
import PARTNERRevenue from './partner-revenue/index'
import UpdatePercentageShare from './update-percentage-share'

function a11yProps(index: string) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

interface TabPanelProps {
	children?: React.ReactNode;
	index: string;
	value: string;
}

export function CustomTabPanel(props: TabPanelProps) {
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

const Body = () => {
	const navigate = useNavigate();
	const [params] = useSearchParams();
	const type = params.get('type');
	const captureRef = useRef<any>(null);
	const [value, setValue] = useState("PR");
	const { state } = useAccessControlContext();
	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};
	const { access } = state || {};
	const isAllowedUpdate = access?.revenueShare?.allowUpdate;
	const isAllowedGPR = access?.revenueShare?.allowGPR;
	const isAllowedPR = access?.revenueShare?.allowPR;

	const handleExportReport = async () => {
		const element = captureRef.current;
		if (!element) return;
	
		// Apply temporary styles to ensure single-line rendering
		const applyTempStyles = (el: HTMLElement) => {
			const prevStyles: Map<HTMLElement, string> = new Map();
			const allNodes = el.querySelectorAll("*");
		
			allNodes.forEach((node) => {
				if (node instanceof HTMLElement) {
					const shouldApply =
						node.id === "noWrap" || node.getAttribute("data-nowrap") === "true";
		
					if (shouldApply) {
						const currentStyle = node.style.whiteSpace;
						prevStyles.set(node, currentStyle);
						node.style.whiteSpace = "nowrap";
					}
				}
			});
		
			return () => {
				// Restore previous styles
				prevStyles.forEach((style, node) => {
					node.style.whiteSpace = style;
				});
			};
		};
		
	
		const revertStyles = applyTempStyles(element);
	
		try {
			const imageData = await DomToImage.toPng(element, {
				filter: (node: any) => {
					return node.id !== "exclude-export";
				}
			});
	
			const pdf = new jsPDF({
				orientation: "portrait",
				unit: "mm",
				format: "a4"
			});
	
			const imgProps = pdf.getImageProperties(imageData);
			const pdfWidth = pdf.internal.pageSize.getWidth();
			const pdfHeight = pdf.internal.pageSize.getHeight();
	
			const imgWidth = imgProps.width;
			const imgHeight = imgProps.height;
	
			const widthScale = pdfWidth / imgWidth;
			const heightScale = pdfHeight / imgHeight;
			const scale = Math.min(widthScale, heightScale);
	
			const scaledWidth = imgWidth * scale;
			const scaledHeight = imgHeight * scale;
	
			const x = (pdfWidth - scaledWidth) / 2;
			const topPadding = 10; // mm
			const y = topPadding;
	
			pdf.addImage(imageData, "PNG", x, y, scaledWidth, scaledHeight);
			pdf.save(`revenue-report-${moment().format("YYYY-MM-DD HH:mm:ss")}.pdf`);
		} catch (err) {
			console.error("Export failed:", err);
		} finally {
			revertStyles(); // always revert styles
		}
	};

	const RenderTabs = useMemo(() => {

		if(isAllowedGPR && isAllowedPR){
			return (
				<Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
					{isAllowedGPR && <Tab value="GPR" label="Game Provider Revenue" {...a11yProps("GPR")} />}
					{isAllowedPR && <Tab value="PR" label="Partner Revenue" {...a11yProps("PR")} />}
				</Tabs>
			)
		}else if(isAllowedGPR){
			return (
				<Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
					{isAllowedGPR && <Tab value="GPR" label="Game Provider Revenue" {...a11yProps("GPR")} />}
				</Tabs>
			)
		}else if(isAllowedPR){
			return (
				<Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
					{isAllowedPR && <Tab value="PR" label="Partner Revenue" {...a11yProps("PR")} />}
				</Tabs>
			)
		}

	},[isAllowedGPR, isAllowedPR, value]);

	const RenderTabPanel = useMemo(() => {
		if(isAllowedGPR && isAllowedPR){
			return (
				<>
				<CustomTabPanel value={value} index={"GPR"}>
					<Box ref={captureRef}>
						<GPRevenue />
					</Box>
				</CustomTabPanel>
				<CustomTabPanel value={value} index={"PR"}>
					<Box ref={captureRef}>
						<PARTNERRevenue />
					</Box>
				</CustomTabPanel>
				</>
			)
		}else if(isAllowedGPR){
			return (
				<CustomTabPanel value={value} index={"GPR"}>
					<Box ref={captureRef}>
						<GPRevenue />
					</Box>
				</CustomTabPanel>
			)
		}else if(isAllowedPR){
			return (
				<CustomTabPanel value={value} index={"PR"}>
					<Box ref={captureRef}>
						<PARTNERRevenue />
					</Box>
				</CustomTabPanel>
			)
		}
	},[isAllowedGPR, isAllowedPR, value, captureRef]);

	if(type){
		return <UpdatePercentageShare />
	}

	return (
		<Container maxWidth="xl">
			<Box
				display={"flex"}
				justifyContent={"space-between"}
				mb={3}
			>
			<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
				{RenderTabs}
			</Box>
				{isAllowedUpdate && 
				<Button id="exclude-export" size='large' variant={"contained"}
					onClick={() => navigate(`/dashboard/programs?type=${value}`)}
					sx={{ backgroundColor: "#0E39C1" }} >
					Update
				</Button>}
			</Box>
			{RenderTabPanel}
			<Button
				size='large'
				variant={"contained"}
				onClick={handleExportReport}
				sx={{
					mt: 4,
					display: "flex",
					alignSelf: "flex-end",
					ml: "auto",    
					backgroundColor: "#0E39C1",
				}}
			>
				EXPORT REPORT
			</Button>
		</Container>
	)
}

export default Body;