export default async (p: string) => await parseCSV(p)


const  parseCSV =async(p: string)=> {
  const content: any =await readCSVAsync(p)
  const rows = content.trim().split('\n');
  const header = rows[0].split(',');

  const data = [];
  for (let i = 1; i < rows.length; i++) {
    const values = rows[i].split(',');
    const entry: any = {};
    for (let j = 0; j < header.length; j++) {
      entry[header[j].trim()] = values[j].trim();
    }
    data.push(entry);
  }
  // console.log(data);

  return data;
}

const readCSVAsync = async (file: any) => {
  const x = await fetch(file);
  const rt = await x.text()
  return rt;
}