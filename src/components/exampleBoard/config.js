

export const configSet = [
    {
        time: ['position'],
    },
    {
        time: ['position'],
        comparison: true,
    },
    {
        time: ['position','markLine'],
        comparison: true,
        coverConfig:{
            basic:{
                linkStyle:{
                    shape:'line'
                }
            }
        }
    },
    {
        time: ['position','markLine'],
        comparison: true,
    },
    {
        time: ['markLine', 'position'],
        comparison: true,
        layout: 'vertical'
    },
    {
        time: ['color']
    },
    {
        time: ['animation'],
        comparison: true,
    },
    {
        time: ['animation', 'position'],
        comparison: true,
    },
    
]