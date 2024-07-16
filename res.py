import requests

data = {'companyName': 'HarithSastra', 'clientID': '6095b4c0-b5c3-4fde-8121-093c16daee65', 'clientSecret': 'tzGDacRwECzdFWhK', 'ownerName': 'Harith', 'ownerEmail': '125157023@sastra.ac.in', 'rollNo': '125157023'}



url = 'http://20.244.56.144/test/auth'

response = requests.post(url, json=data)


print(response.status_code)
print(response.json())