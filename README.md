# 基于vue-codemirror的可视化代码编辑平台

用户可以新建、保存、更改自定义方案

数据保存格式
```
caseList:[
	{
		caseId: "",       // 方案ID
		caseName: "",     // 方案名称
		code: {           // 方案源码
			html: "",       // html源码
			js: "",         // js源码
			css: "",        // css源码
			dataSource: ""  // 方案的数据源
		},
		vendors: [],      // 方案依赖的第三方库
		type: "",         // 方案所属类型（例如：柱状图、饼图等） --预留字段
		img: "",          // 方案缩略图 --预留字段
		author: "",       // 方案提供者 --预留字段
		projectName: "",  // 方案所属项目名称 --预留字段
		remarks: ""       // 方案备注 --预留字段
	}
]
```
