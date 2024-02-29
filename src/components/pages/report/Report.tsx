import { Column } from '@ant-design/charts'
import { Card } from '../../common/Card'

const Report = () => {
  const data = [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 },
  ]

  const config = {
    data,
    height: 400,
    xField: 'year',
    yField: 'value',
    point: {
      size: 5,
      shape: 'diamond',
    },
  }

  return (
    <>
      <Card>
        <div className='flex justify-center w-full items-center'>
          <div className='w-1/3'>
            <p className='pb-2 text-sm text-slate-800'>Total Focus Time</p>
            <h1 className='text-3xl text-slate-500 font-semibold'>20</h1>
          </div>
          <div className='w-1/3 border-x'>
            <p className='pb-2 text-sm text-slate-800'>Total Login Count</p>
            <h1 className='text-3xl text-slate-500 font-semibold'>20</h1>
          </div>
          <div className='w-1/3'>
            <p className='pb-2 text-sm text-slate-800'>Consecutive Login Count</p>
            <h1 className='text-3xl text-slate-500 font-semibold'>20</h1>
          </div>
        </div>
      </Card>
      <Card>
        <Column {...config} />
      </Card>
    </>
  )
}

export default Report