storiesOf('橫幅（banner）', module)
    .add('bn_conl', () => {
        let props = {
            "options": { // [object]
            },
            "data": { // [object]
                "positionID": "m01", // [string]
                "positionName": "區域名稱", // [string]
                "searchPanel": "",  // [string]
                "data": [ // [array]
                    {
                        "imgsrcM": "", // [string]
                        "imgsrcPC": "", // [string]
                        "title": "", // [string]
                        "href": "", // [string]
                        "targetBlank": true, // [bool]
                        "alt": "" // [string]
                    }
                ]
            }
        };
        return (
            <div>
                <BnConl {...props} />
            </div>
        );
    });