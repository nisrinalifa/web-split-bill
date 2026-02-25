<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <h1>Halaman Blog</h1>

    <article>
        <h3>Judul 1</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque suscipit consectetur odit tempore neque provident, veniam adipisci velit nobis placeat totam, quis nesciunt repudiandae explicabo, quos molestiae exercitationem. Aut, porro!</p>
    </article>

    <article>
        <h3>Judul 2</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque suscipit consectetur odit tempore neque provident, veniam adipisci velit nobis placeat totam, quis nesciunt repudiandae explicabo, quos molestiae exercitationem. Aut, porro!</p>
    </article>

    <script>
    function Example() {
        return (
            <Fieldset>
            <Legend>Resale and transfers</Legend>
            <Text>Decide if people buy tickets from you or from scalpers.</Text>
            <RadioGroup name="resale" defaultValue="permit">
                <RadioField>
                <Radio value="permit" />
                <Label>Allow tickets to be resold</Label>
                <Description>Customers can resell or transfer their tickets if they can’t make it to the event.</Description>
                </RadioField>
                <RadioField>
                <Radio value="forbid" />
                <Label>Don’t allow tickets to be resold</Label>
                <Description>Tickets cannot be resold or transferred to another person.</Description>
                </RadioField>
            </RadioGroup>
            </Fieldset>
        )
        }
</script>
    
</body>
</html>