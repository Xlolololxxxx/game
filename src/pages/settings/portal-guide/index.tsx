import { Container } from '@mui/material';
import sections from '@src/lib/data/portal-guide';
import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import TableOfContents from './contents';
import Toolbar from './toolbar';

export default function PortalGuide() {
	const [search, setSearch] = useState<string>("");
	
	const newSections = useMemo(() => {
		return sections.filter((section) => {
			const { title } = section;
			return title.toLowerCase().includes(search.toLowerCase());
		});
	}, [search]);

	return (
		<>
			<Helmet>
				<title> Portal Guide </title>
			</Helmet>
			<Container>
				<Toolbar search={search} onChange={setSearch} />
				<TableOfContents options={newSections}/>
			</Container>
		</>
	)
}