'------------------------------------------------------------------------------
' <auto-generated>
'     This code was generated from a template.
'
'     Manual changes to this file may cause unexpected behavior in your application.
'     Manual changes to this file will be overwritten if the code is regenerated.
' </auto-generated>
'------------------------------------------------------------------------------

Imports System
Imports System.Collections.Generic

Partial Public Class Note
	<ComponentModel.DataAnnotations.Key>
	Public Property ID As Integer
	Public Property [Date] As Date
	Public Property Title As String
	Public Property Text As String

	<Newtonsoft.Json.JsonIgnore>
	Public Overridable Property Contact As Contact

End Class
