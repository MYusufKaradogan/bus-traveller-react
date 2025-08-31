export const getDummyData = (serviceName, queryParams) => {
    if (serviceName.startsWith("tours/getAll")) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    data: [
                        ...[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(index => (
                            {
                                id: index,
                                title: "İlan başlık " + index,
                                location: "İstanbul/Nişantaşı",
                                date: "2025.04.15",
                                price: 240,
                                period: "Aylık",
                                availability: "Uygun",
                                adType: "Billboard",
                                url: "https://picsum.photos/800/600?random=" + index,
                            }
                        ))
                    ]
                });
            }, 1000);
        });
    } else if (serviceName.startsWith("ads/getById")) {
        const id = serviceName.split("/")[2];
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    data: {
                        "companyInventory": {
                            "id": id,
                            "companyId": 1,
                            "group": "0/1-Tekil veya Grup ",
                            "typeId": 1,
                            "latLon": "29.0136, 41.0053",
                            "cityName": "İstanbul",
                            "townName": "Nişantaşı",
                            "cityId": 34,
                            "townId": 585,
                            "locationComment": "Nispetiye Caddesi No:13 Cephe Billboard",
                            "width": "30",
                            "height": "20",
                            "length": "10",
                            "frequency": "15",
                            "minRentPeriod": 1,
                            "timeLine": "0/1/2 combo seçimi",
                            "header": "Başlık",
                            "comment": "html Açıklama",
                            "ownerType": 1,
                            "count": 28,
                            "descriptionTitle": "Şehir Merkezinde Yüksek Görünürlüklü Bilboard Alanı Kiralıktır!",
                            "description": "Yoğun araç ve yaya trafiğine sahip cadde üzerinde, prestijli bir lokasyonda yer alan bu modern bilboard alanı, markanızın görünürlüğünü artırmak için mükemmel bir fırsat sunuyor. Geniş yüzeyi sayesinde dikkat çekici kampanyalarınızı etkili biçimde sergileyebilir, hedef kitlenize doğrudan ulaşabilirsiniz."
                        },
                        "inventoryCalendar": {
                            "inventoryId": 1,
                            "start_date": "01.01.2025 ",
                            "end_date": "31.12.2025",
                            "type": "0/1 rezervasyon-Teklif Usülü",
                            "amount": 37500.00,
                            "paymentType": "0-Peşin 1-%50 vade vb",
                        },
                        "inventoryImage": [
                            {
                                "inventoryId": 1,
                                "order": "1",
                                "file": "https://picsum.photos/800/600?random=1"
                            },
                            {
                                "inventoryId": 1,
                                "order": "22",
                                "file": "https://picsum.photos/800/600?random=2"
                            },
                            {
                                "inventoryId": 1,
                                "order": "3",
                                "file": "https://picsum.photos/800/600?random=3"
                            },
                            {
                                "inventoryId": 1,
                                "order": "4",
                                "file": "https://picsum.photos/800/600?random=4"
                            },
                            {
                                "inventoryId": 1,
                                "order": "5",
                                "file": "https://picsum.photos/800/600?random=5"
                            },
                            {
                                "inventoryId": 1,
                                "order": "6",
                                "file": "https://picsum.photos/800/600?random=6"
                            },
                        ],
                    }
                });
            }, 1000);
        });
    } else {
        return Promise.reject("Unknown serviceName: " + serviceName);
    }
}