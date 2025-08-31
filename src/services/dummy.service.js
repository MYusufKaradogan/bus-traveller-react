export const getDummyData = (serviceName, queryParams) => {
    if (serviceName.startsWith("tours/getAll")) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    data: [
                        {
                            route: "Ankara - İstanbul",
                            purpose: "Toplantı",
                            startDate: "04.08.2025",
                            endDate: "06.08.2025",
                            status: "Gerçekleşti"
                        },
                        {
                            route: "İzmir - Antalya",
                            purpose: "Fuar",
                            startDate: "10.09.2025",
                            endDate: "15.09.2025",
                            status: "Planlandı"
                        },
                        {
                            route: "Bursa - Eskişehir",
                            purpose: "Müşteri Ziyareti",
                            startDate: "20.07.2025",
                            endDate: "21.07.2025",
                            status: "İptal Edildi"
                        },
                        {
                            route: "Adana - Gaziantep",
                            purpose: "Eğitim",
                            startDate: "01.10.2025",
                            endDate: "05.10.2025",
                            status: "Planlandı"
                        },
                        {
                            route: "Trabzon - Rize",
                            purpose: "Seminer",
                            startDate: "11.11.2025",
                            endDate: "13.11.2025",
                            status: "Gerçekleşti"
                        },
                        {
                            route: "Konya - Kayseri",
                            purpose: "Denetim",
                            startDate: "02.03.2025",
                            endDate: "04.03.2025",
                            status: "Gerçekleşti"
                        },
                        {
                            route: "Mersin - Hatay",
                            purpose: "Lojistik",
                            startDate: "18.04.2025",
                            endDate: "20.04.2025",
                            status: "Planlandı"
                        },
                        {
                            route: "Edirne - Tekirdağ",
                            purpose: "Eğitim",
                            startDate: "25.05.2025",
                            endDate: "27.05.2025",
                            status: "Gerçekleşti"
                        },
                        {
                            route: "Samsun - Ordu",
                            purpose: "Toplantı",
                            startDate: "30.06.2025",
                            endDate: "02.07.2025",
                            status: "İptal Edildi"
                        },
                        {
                            route: "Kocaeli - Sakarya",
                            purpose: "Müşteri Ziyareti",
                            startDate: "05.07.2025",
                            endDate: "06.07.2025",
                            status: "Gerçekleşti"
                        },
                        {
                            route: "Denizli - Muğla",
                            purpose: "Fuar",
                            startDate: "12.08.2025",
                            endDate: "16.08.2025",
                            status: "Planlandı"
                        },
                        {
                            route: "Malatya - Elazığ",
                            purpose: "Seminer",
                            startDate: "19.09.2025",
                            endDate: "21.09.2025",
                            status: "Gerçekleşti"
                        },
                        {
                            route: "Kars - Erzurum",
                            purpose: "Toplantı",
                            startDate: "03.10.2025",
                            endDate: "05.10.2025",
                            status: "Planlandı"
                        },
                        {
                            route: "Balıkesir - Çanakkale",
                            purpose: "Müşteri Ziyareti",
                            startDate: "22.11.2025",
                            endDate: "24.11.2025",
                            status: "Gerçekleşti"
                        }
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