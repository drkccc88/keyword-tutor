'use client';

import { Quiz } from '@/conponents/quiz';
import { useExplanation } from '@/hooks/useExplanation';
import { useQuiz } from '@/hooks/useQuiz';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { ReactNode, useState } from 'react';
import ReactMarkdown from 'react-markdown';

type TabPanelProps = {
    children?: ReactNode;
    index: number;
    value: number;
};
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
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs({
    params,
}: {
    params: Promise<{ keyword: string }>;
}) {
    const [tabValue, setTabValue] = useState(0);
    const ex = useExplanation(params);
    const qz = useQuiz(params);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabValue} onChange={handleChange}>
                    <Tab
                        label={<Typography>理解度テスト</Typography>}
                        {...a11yProps(0)}
                    />
                    <Tab
                        label={<Typography>概要を確認</Typography>}
                        {...a11yProps(1)}
                    />
                </Tabs>
            </Box>
            <CustomTabPanel value={tabValue} index={0}>
                {qz?.map((d, i) => {
                    return (
                        <Quiz
                            key={i}
                            probrem={d.pr}
                            choices={d.quiz}
                            params={params}
                            index={i}
                        />
                    );
                })}
            </CustomTabPanel>
            <CustomTabPanel value={tabValue} index={1}>
                <ReactMarkdown>{ex}</ReactMarkdown>
            </CustomTabPanel>
        </Box>
    );
}
