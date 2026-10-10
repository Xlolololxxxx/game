import { Card } from '@mui/material'
import DataSection from './data-section'
import FilterSection from './filter-section'

const GPRevenue = () => {
	return (
		<Card 
			sx={{ 
				px: {
					xl: 4,
					lg: 4,
					md: 4,
					sm: 2,
					xs: 2,
				}, pt: 2, pb: 6, minHeight: 500 }}>
			<FilterSection />
			<DataSection />
		</Card>
	)
}

export default GPRevenue;