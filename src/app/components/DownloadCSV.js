import React,{useState,useEffect} from 'react';
import { ExportToCsv } from 'export-to-csv';

import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/SaveAlt';

let DownloadCSV = (props) =>{
    let [data, setData] = useState([]);
    useEffect(()=>{
      setData(props.data)
    },[props.data])

    const handleDownload = () =>{{
      console.log(props.selected);

      let selected = props.selected ? props.selected : "Citywide";
        const options = {
          fieldSeparator: ',',
          quoteStrings: '"',
          decimalSeparator: '.',
          showLabels: false,
          showTitle: true,
          title: props.title + ", 5YR ACS 2013-2017, For region(s): " + selected,
          useTextFile: false,
          // useBom: true,
          // useKeysAsHeaders: false,
          filename:props.title + ", 5YR ACS 2013-2017",
          // headers:["region(s): "+props.selected ? props.selected : "Citywide"]
          // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
        };

        let tempArr = [];

          tempArr = tempArr.concat(data);
          let total = data.map(temp => temp[1]).reduce((a,b)=> a + b);
          tempArr.push(["total",total]);
          tempArr.push(["Source","U.S Census Bureau, 2013-2017 American Community Survey 5-Year Estimates, BPDA Research Division Analysis."])
          tempArr.push(["For Region(s):" + selected,""]);
          const csvExporter = new ExportToCsv(options);

        csvExporter.generateCsv(tempArr);


        
    }}
    return (
                    <IconButton aria-label="Delete" onClick={handleDownload}>
                        <SaveIcon />
                      </IconButton>
    )
}

export default DownloadCSV