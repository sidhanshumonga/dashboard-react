import React from 'react';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css';
import './table.css'

// see documentation for supported input formats

export default function TableChart(props) {
    const [pivot, setPivot] = React.useState({
        aggregatorName: 'Sum',
    })

    const selectedPeriods = props.periods
    const periodsMap = {};
    selectedPeriods.forEach((x) => {
        periodsMap[x.id] = x.name;
    });

    const data = props.data;
    
    const modifyData = () => {
        return data.map(x => {
            return {
                Indicator: x.indicator,
                Location: x.location,
                Period: periodsMap[x.period],
                Value: parseInt(x.value)
            }
        })
    }
    let data2 = modifyData()

    const handleChange = (event) => {
        setPivot(event)
    }
    return (
        <PivotTableUI
            data={data2}
            rows={["Period"]}
            cols={["Location"]}
            vals={["Value"]}
            onChange={s => handleChange(s)}
            {...pivot}
        />
    );
}
