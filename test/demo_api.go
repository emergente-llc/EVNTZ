package main

import (
	"fmt"
	"io"
	"net/http"
	"strconv"
	"strings"
	"time"
)

func main() {
	var numExecutions int
	fmt.Print("Enter the number of transactions you want to send to the API call: ")
	fmt.Scanln(&numExecutions)

	for i := 0; i < numExecutions; i++ {
		makeAPICall(i + 1)
		time.Sleep(5 * time.Second)
	}
}

func makeAPICall(index int) {
	url := "http://bkyz2-fmaaa-aaaaa-qaaaq-cai.localhost:4943/transactions"
	method := "POST"
	payload := strings.NewReader(`{
									"orderId": "HEA4L` + strconv.Itoa(index) + `",
									"status": "new",
									"operation": "sale",
									"companyId": "1642e7f0-979d-4d57-aaa0-c73ed96622ae",
									"event": {
										"eventId": "d472d65e-b4cb-47ef-837d-544e4f26974c",
										"eventName": "Journey - Freedom Tour 2022",
										"eventArtist": "Journey",	
										"eventVenue": "Coliseo de Puerto Rico",
										"eventCountry": "San Juan Puerto Rico",
										"eventVenueGPS": "18.4277361,-66.0639617",
										"eventDateTime": "09/23/2022 08:00PM",
										"eventPromoterCompany": "Sireno Mesa, R&M Entertainment y Caribbean Concerts",
										"eventInformation": "Por política del Coliseo y por su seguridad, se requiere que todo menor de 16 años esté acompañado por un adulto en todo momento durante los eventos. Esta regla aplica para todos los eventos que se llevan a cabo en el Coliseo de Puerto Rico."
									},
									"user": {
										"name": "Juan del Pueblo",
										"email": "juan.delpueblo@gmail.com",
										"phone": "7873452022"
									},
									"seats": [
										{
											"ticket": {
												"ticketId": "61` + strconv.Itoa(index) + `",	
												"ticketStatus": "active",			
												"ticketSection": "110",
												"ticketRow": "A",
												"ticketSeat": "15",
												"ticketDescription": "",
												"ticketQty": "1",
												"ticketPrice": "155.00",
												"ticketPriceIVU": "13.23",
												"ticketServiceFee": "6.75",
												"ticketServiceFeeIVU": "0.78",
												"ticketPromoterFee": "4.00",
												"ticketPromoterFeeIVU": "0.46",
												"ticketClubSeatsFee": "5.00",
												"ticketClubSeatsFeeIVU": "0.58",
												"ticketFacilityFee": "2.00",                
												"ticketFacilityFeeIVU": "0.23",
												"ticketOrderFeeWeb": "3.00",
												"ticketOrderFeeWebIVU": "0.35",
												"ticketTotal": "151.38"
											}
										}
									]
								}`)

	client := &http.Client{}
	req, err := http.NewRequest(method, url, payload)

	if err != nil {
		fmt.Println(err)
		return
	}
	req.Header.Add("Authorization", "Bearer ecc448d9-5f00-42f6-a973-ad6fca9fa265")
	req.Header.Add("Content-Type", "application/json")
	req.Header.Add("RS_SEC_HDR_VENDOR_ID", "ab38a423-9af0-4811-a5b4-482114fd918d")
	req.Header.Add("RS_SEC_HDR_VENDOR_PASSWORD", "201y*ZI1N-2+5&>MSfUfo2o+Buo8&klt3uw?863M2L71z*qY")

	res, err := client.Do(req)
	if err != nil {
		fmt.Println(err)
		return
	}
	defer res.Body.Close()

	body, err := io.ReadAll(res.Body)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println(string(body))
}
